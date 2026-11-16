'use client';

import React from 'react';
import { useExamStore } from '@/store/useExamStore';
import { useAppStore } from '@/store/useAppStore';
import { Flag } from 'lucide-react';

export const QuestionNavigator: React.FC = () => {
  const { session, jumpQuestion } = useExamStore();
  const { language } = useAppStore();
  const isVi = language === 'vi';

  const answeredCount = Object.keys(session.answers).length;
  const totalCount = session.questions.length;

  return (
    <aside className="w-full lg:w-72 bg-card border border-border rounded-lg p-3.5 flex flex-col gap-3">
      <div className="flex justify-between items-center text-xs">
        <strong className="font-semibold text-foreground">
          {isVi ? 'Bảng câu hỏi' : 'Question Grid'}
        </strong>
        <span className="font-mono text-secondary">
          {answeredCount} / {totalCount}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
        {session.questions.map((q, idx) => {
          const isCurrent = idx === session.currentIdx;
          const isAnswered = typeof session.answers[idx] === 'number';
          const isFlagged = session.flagged.includes(idx);

          let nodeStyle = 'bg-card border-border text-secondary hover:border-primary/50';

          if (session.finished) {
            const isRight = session.answers[idx] === q.ans;
            nodeStyle = isRight
              ? 'bg-positive/10 border-positive/40 text-positive font-bold'
              : 'bg-error/10 border-error/40 text-error font-bold';
          } else if (isAnswered) {
            nodeStyle = 'bg-primary/10 border-primary/40 text-primary font-semibold';
          }

          if (isCurrent) {
            nodeStyle += ' ring-2 ring-primary ring-offset-1 font-bold';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => jumpQuestion(idx)}
              className={`h-8 rounded-md font-mono text-xs border relative flex items-center justify-center transition-colors ${nodeStyle}`}
            >
              <span>{idx + 1}</span>
              {isFlagged && (
                <span
                  className="absolute -top-1 -right-1 p-0.5 rounded-full bg-card border border-warning"
                  title={isVi ? 'Đã đánh dấu xem lại' : 'Flagged for review'}
                >
                  <Flag className="w-2.5 h-2.5 text-warning fill-warning" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-[11px] text-secondary flex flex-col gap-1 pt-2 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-primary/10 border border-primary/40" />
          <span>{isVi ? 'Đã chọn đáp án' : 'Answered'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span>{isVi ? 'Đã đánh dấu cờ' : 'Flagged'}</span>
        </div>
        {session.finished && (
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded bg-positive/20 border border-positive/40" />
            <span>{isVi ? 'Đúng' : 'Correct'}</span>
            <span className="w-2.5 h-2.5 rounded bg-error/20 border border-error/40 ml-2" />
            <span>{isVi ? 'Sai' : 'Wrong'}</span>
          </div>
        )}
      </div>
    </aside>
  );
};
