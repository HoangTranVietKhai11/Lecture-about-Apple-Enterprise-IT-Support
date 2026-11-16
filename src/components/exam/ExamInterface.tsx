'use client';

import React, { useState } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { useAppStore } from '@/store/useAppStore';
import { useMentorStore } from '@/store/useMentorStore';
import { Timer } from './Timer';
import { QuestionNavigator } from './QuestionNavigator';
import { Flag, ArrowLeft, ArrowRight, Languages, CheckCircle2, LogOut, Sparkles } from 'lucide-react';

export const ExamInterface: React.FC = () => {
  const { session, selectAnswer, toggleFlag, jumpQuestion, finishExam, resetExam } = useExamStore();
  const { language } = useAppStore();
  const { openWithContext } = useMentorStore();
  const isVi = language === 'vi';

  const [showEnglish, setShowEnglish] = useState<boolean>(false);
  const [submitArmed, setSubmitArmed] = useState<boolean>(false);

  const qIdx = session.currentIdx;
  const q = session.questions[qIdx];
  const selectedOpt = session.answers[qIdx];
  const isFlagged = session.flagged.includes(qIdx);
  const isAnswered = typeof selectedOpt === 'number';

  // Instant feedback is active in PRACTICE or CHAPTER mode
  const showInstantFeedback = session.mode !== 'TIMED' && isAnswered;

  const letters = ['A', 'B', 'C', 'D'];

  const handleSubmit = () => {
    const unanswered = session.questions.length - Object.keys(session.answers).length;
    if (unanswered > 0 && !submitArmed) {
      setSubmitArmed(true);
      return;
    }
    finishExam();
  };

  const unansweredCount = session.questions.length - Object.keys(session.answers).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3 p-3.5 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-[11px]">
            {session.title || 'DEP110 EXAM'}
          </span>
          <span className="text-xs font-mono text-secondary">
            {isVi ? `Câu ${qIdx + 1} / ${session.questions.length}` : `Question ${qIdx + 1} / ${session.questions.length}`}
          </span>
          {session.flagged.length > 0 && (
            <span className="px-2 py-0.5 rounded bg-warning/10 text-warning text-[11px] font-semibold font-mono">
              {session.flagged.length} {isVi ? 'đánh dấu' : 'flagged'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowEnglish(!showEnglish)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              showEnglish
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-card border-border text-secondary hover:text-foreground hover:bg-surface-high'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{showEnglish ? 'Song ngữ VN + EN' : 'Tiếng Việt'}</span>
          </button>

          {session.mode === 'TIMED' && <Timer />}

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              submitArmed
                ? 'bg-error text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {submitArmed
              ? isVi ? `Còn ${unansweredCount} câu trống — Bấm để nộp` : `${unansweredCount} unanswered — Click to Submit`
              : isVi ? 'Nộp bài & Chấm điểm' : 'Submit Exam'}
          </button>

          <button
            type="button"
            onClick={resetExam}
            className="p-1.5 rounded-md text-secondary hover:text-foreground hover:bg-surface-high"
            title={isVi ? 'Thoát bài thi' : 'Exit Exam'}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Exam Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Question Area */}
        <div className="flex-1 bg-card border border-border rounded-lg p-5 flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center text-xs">
            <span className="px-2 py-0.5 rounded bg-sidebar border border-border text-secondary font-mono text-[11px]">
              {q.domain}
            </span>
            <button
              type="button"
              onClick={() => toggleFlag(qIdx)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                isFlagged
                  ? 'bg-warning/10 border-warning/40 text-warning'
                  : 'bg-card border-border text-secondary hover:text-foreground'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-warning' : ''}`} />
              <span>{isFlagged ? (isVi ? 'Đã đánh dấu' : 'Flagged') : (isVi ? 'Đánh dấu xem lại' : 'Flag')}</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold text-foreground leading-snug">
              {q.qVn}
            </h3>
            {showEnglish && q.qEn && (
              <p className="text-xs text-secondary italic leading-relaxed border-l-2 border-primary pl-2.5">
                EN: {q.qEn}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {q.opts.map((opt, optIdx) => {
              let optStyle = 'border-border bg-card hover:bg-surface-high text-foreground';
              let letterStyle = 'bg-sidebar text-secondary border border-border';

              if (showInstantFeedback) {
                if (optIdx === q.ans) {
                  optStyle = 'border-positive/40 bg-positive/10 text-foreground font-medium';
                  letterStyle = 'bg-positive text-white border-positive';
                } else if (optIdx === selectedOpt) {
                  optStyle = 'border-error/40 bg-error/10 text-foreground';
                  letterStyle = 'bg-error text-white border-error';
                }
              } else if (selectedOpt === optIdx) {
                optStyle = 'border-primary/50 bg-primary/10 text-foreground font-medium ring-1 ring-primary';
                letterStyle = 'bg-primary text-white border-primary';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => selectAnswer(qIdx, optIdx)}
                  className={`flex items-start gap-3 w-full p-3 rounded-md border text-left text-xs transition-colors ${optStyle}`}
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[11px] flex-shrink-0 ${letterStyle}`}
                  >
                    {letters[optIdx]}
                  </span>
                  <div className="flex-1 pt-0.5 flex flex-col gap-0.5">
                    <span className="leading-relaxed">{opt}</span>
                    {showEnglish && q.optsEn && q.optsEn[optIdx] && (
                      <span className="text-[11px] text-secondary italic">
                        {q.optsEn[optIdx]}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Instant Explanation (Practice / Chapter Mode) */}
          {showInstantFeedback && (
            <div className="p-3 rounded-md bg-card border border-border border-l-4 border-l-primary text-xs flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <strong className="text-foreground font-semibold">
                  {isVi ? 'Giải thích chuyên môn:' : 'Technical Rationale:'}
                </strong>
                <p className="text-secondary leading-relaxed">
                  {isVi ? q.expVn : q.expEn || q.expVn}
                </p>
              </div>
              <div className="flex justify-end pt-1 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => {
                    openWithContext({
                      question: isVi ? q.qVn : (q.qEn || q.qVn),
                      userSelected: typeof selectedOpt === 'number' ? `${letters[selectedOpt]}: ${q.opts[selectedOpt]}` : 'Chưa chọn',
                      correctAnswer: `${letters[q.ans]}: ${q.opts[q.ans]}`,
                      context: `${q.domain} (Câu ${qIdx + 1})`,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-[11px] font-medium transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isVi ? 'Hỏi Apple Mentor giải thích sâu hơn' : 'Ask Apple Mentor'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Question Step Controls */}
          <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
            <button
              type="button"
              disabled={qIdx === 0}
              onClick={() => jumpQuestion(qIdx - 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? 'Câu trước' : 'Previous'}</span>
            </button>

            <span className="text-xs font-mono text-secondary">
              {qIdx + 1} / {session.questions.length}
            </span>

            <button
              type="button"
              disabled={qIdx === session.questions.length - 1}
              onClick={() => jumpQuestion(qIdx + 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>{isVi ? 'Câu tiếp' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sidebar Question Navigator */}
        <QuestionNavigator />
      </div>
    </div>
  );
};
