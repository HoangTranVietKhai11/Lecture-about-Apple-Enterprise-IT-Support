'use client';

import React, { useState, useEffect } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { useAppStore } from '@/store/useAppStore';
import { useMentorStore } from '@/store/useMentorStore';
import { CheckCircle2, XCircle, RotateCcw, Eye, ArrowRight, Sparkles } from 'lucide-react';

export const ExamResult: React.FC = () => {
  const { session, lastFailedQuestions, retryFailedQuestions, resetExam } = useExamStore();
  const { language, setBestExamPct } = useAppStore();
  const { openWithContext } = useMentorStore();
  const isVi = language === 'vi';

  const [showReview, setShowReview] = useState<boolean>(false);

  const total = session.questions.length;
  const score = session.score || 0;
  const percentage = session.percentage || 0;
  const passed = session.passed || false;

  useEffect(() => {
    if (session.finished && typeof session.percentage === 'number') {
      setBestExamPct(session.percentage);
    }
  }, [session.finished, session.percentage, setBestExamPct]);

  // Calculate domain stats
  const domainStats: Record<string, { ok: number; total: number }> = {};
  session.questions.forEach((q, idx) => {
    if (!domainStats[q.domain]) {
      domainStats[q.domain] = { ok: 0, total: 0 };
    }
    domainStats[q.domain].total++;
    if (session.answers[idx] === q.ans) {
      domainStats[q.domain].ok++;
    }
  });

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col gap-5">
      {/* Result Hero Banner: Clean Apple border-l accent */}
      <div
        className={`p-5 rounded-lg border bg-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
          passed
            ? 'border-border border-l-4 border-l-positive'
            : 'border-border border-l-4 border-l-error'
        }`}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider w-fit ${
              passed ? 'bg-positive/10 text-positive' : 'bg-error/10 text-error'
            }`}
          >
            {passed
              ? isVi ? 'ĐẠT CHUẨN (PASS)' : 'PASS (≥ 75%)'
              : isVi ? 'CHƯA ĐẠT (FAIL — CẦN ÔN TẬP THÊM)' : 'FAIL (< 75%)'}
          </span>
          <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground font-mono">
            {isVi ? `Điểm số: ${score} / ${total} câu đúng (${percentage}%)` : `Result: ${score} / ${total} Correct (${percentage}%)`}
          </h2>
          <p className="text-xs text-secondary max-w-xl leading-relaxed">
            {passed
              ? isVi
                ? 'Chúc mừng! Điểm số của bạn đã đạt ngưỡng 75% tiêu chuẩn kỳ thi Apple Certified IT Professional (DEP110).'
                : 'Congratulations! You met the 75% passing threshold required by Pearson VUE for DEP110 certification.'
              : isVi
                ? `Bạn còn thiếu ${Math.max(0, Math.ceil(total * 0.75) - score)} câu để đạt ngưỡng 75%. Hãy xem lại các nhóm kiến thức bên dưới và luyện tập lại.`
                : `You need ${Math.max(0, Math.ceil(total * 0.75) - score)} more points to reach the 75% passing score. Review the domains below.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {lastFailedQuestions.length > 0 && (
            <button
              type="button"
              onClick={retryFailedQuestions}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-error text-white text-xs font-medium hover:bg-error/90 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {isVi ? `Luyện lại ${lastFailedQuestions.length} câu sai` : `Retry ${lastFailedQuestions.length} Failed`}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowReview(!showReview)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card text-foreground text-xs font-medium hover:bg-surface-high transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showReview ? (isVi ? 'Ẩn đáp án' : 'Hide Review') : (isVi ? 'Xem lại đáp án' : 'Review Answers')}</span>
          </button>

          <button
            type="button"
            onClick={resetExam}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <span>{isVi ? 'Thi đề mới' : 'New Exam'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Domain Breakdown Progress Bars */}
      <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3.5">
        <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">
          {isVi ? 'Phân tích năng lực theo nhóm kiến thức' : 'Domain Competency Breakdown'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(domainStats).map(([dom, st], idx) => {
            const p = Math.round((st.ok / st.total) * 100);
            const isDomainPass = p >= 75;

            return (
              <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-md bg-card border border-border">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-medium text-foreground">{dom}</span>
                  <span className="font-mono font-semibold text-secondary">
                    {st.ok} / {st.total} ({p}%)
                  </span>
                </div>
                <div className="w-full bg-border-subtle h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isDomainPass ? 'bg-positive' : 'bg-secondary'
                    }`}
                    style={{ width: `${p}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer Review Section */}
      {showReview && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">
            {isVi ? 'Chi tiết từng câu hỏi & Đáp án' : 'Question Breakdown & Rationales'}
          </h3>

          <div className="flex flex-col gap-3">
            {session.questions.map((q, idx) => {
              const userAns = session.answers[idx];
              const isCorrect = userAns === q.ans;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border bg-card flex flex-col gap-2.5 ${
                    isCorrect
                      ? 'border-border border-l-4 border-l-positive'
                      : 'border-border border-l-4 border-l-error'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-secondary font-medium">
                      {isVi ? `Câu ${idx + 1}` : `Question ${idx + 1}`} • {q.domain}
                    </span>
                    <span
                      className={`font-semibold ${
                        isCorrect ? 'text-positive' : 'text-error'
                      }`}
                    >
                      {isCorrect
                        ? isVi ? 'ĐÚNG ✓' : 'CORRECT ✓'
                        : isVi ? 'SAI ✗' : 'INCORRECT ✗'}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-foreground leading-snug">
                    {q.qVn}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {q.opts.map((opt, optIdx) => {
                      let itemStyle = 'text-secondary border-border bg-card';
                      if (optIdx === q.ans) {
                        itemStyle = 'border-positive/40 bg-positive/10 text-foreground font-medium';
                      } else if (optIdx === userAns) {
                        itemStyle = 'border-error/40 bg-error/10 text-foreground line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2 rounded border text-xs flex items-center gap-2 ${itemStyle}`}
                        >
                          <span className="font-mono font-bold text-[11px] w-4 text-center">
                            {letters[optIdx]}
                          </span>
                          <span className="leading-tight">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-border text-xs text-secondary leading-relaxed flex flex-col gap-2">
                    <div>
                      <strong className="text-foreground">Giải thích: </strong>
                      {q.expVn}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          openWithContext({
                            question: q.qVn,
                            userSelected: typeof userAns === 'number' ? `${letters[userAns]}: ${q.opts[userAns]}` : 'Chưa chọn',
                            correctAnswer: `${letters[q.ans]}: ${q.opts[q.ans]}`,
                            context: `${q.domain} (Câu ${idx + 1})`,
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-[11px] font-medium transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{isVi ? 'Hỏi Apple Mentor về câu này' : 'Ask Apple Mentor about this'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
