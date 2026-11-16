'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Chapter } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { ChapterCheckpoint } from './ChapterCheckpoint';
import { ComparisonMatrix } from './ComparisonMatrix';
import { ChapterNotes } from './ChapterNotes';
import { FlashcardViewer } from './FlashcardViewer';
import {
  Lightbulb,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Table,
  HelpCircle,
  Sparkles,
  FileText,
} from 'lucide-react';

interface ChapterDetailProps {
  chapter: Chapter;
  totalChapters: number;
}

export const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter, totalChapters }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'matrix' | 'checkpoint' | 'flashcard' | 'notes'>('theory');
  const { language, completedChapters, toggleChapterComplete } = useAppStore();
  const isVi = language === 'vi';

  const isCompleted = completedChapters.includes(chapter.id);

  return (
    <div className="flex flex-col gap-5">
      {/* Chapter Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-semibold text-[11px]">
              {chapter.code}
            </span>
            {chapter.duration && (
              <span className="text-[12px] text-secondary">
                {chapter.duration}
              </span>
            )}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] text-positive font-medium px-2 py-0.5 rounded bg-positive/10">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đã hoàn thành' : 'Completed'}</span>
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {chapter.title}
          </h2>
          <p className="text-[13px] text-secondary leading-relaxed">
            {chapter.lede}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {chapter.id > 1 && (
            <Link
              href={`/learn/${chapter.id - 1}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? 'Trước' : 'Prev'}</span>
            </Link>
          )}

          {chapter.id < totalChapters && (
            <Link
              href={`/learn/${chapter.id + 1}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <span>{isVi ? 'Sau' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Subtab Navigation Bar */}
      <div className="flex flex-wrap gap-1.5 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('theory')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'theory'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isVi ? '1. Lý thuyết & Thuật ngữ' : '1. Theory & Terms'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'matrix'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>{isVi ? '2. Ma trận So sánh' : '2. Comparison Matrix'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('checkpoint')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'checkpoint'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isVi ? '3. Mini-Quiz Checkpoint' : '3. Checkpoint Quiz'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('flashcard')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'flashcard'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isVi ? '4. Luyện Flashcard' : '4. Flashcards'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notes')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'notes'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isVi ? '5. Ghi chú Chương' : '5. Personal Notes'}</span>
        </button>
      </div>

      {/* Subtab Content Panels */}
      {activeTab === 'theory' && (
        <div className="flex flex-col gap-5">
          {/* Key Terminology Badges */}
          {chapter.keyTerms && chapter.keyTerms.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider mr-1">
                {isVi ? 'Từ khóa trọng tâm:' : 'Key Terms:'}
              </span>
              {chapter.keyTerms.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-card border border-border text-[12px] font-mono text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Theory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2.5"
              >
                {card.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-border-subtle text-secondary w-fit">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-[15px] font-semibold text-foreground">
                  {card.title || card.heading}
                </h3>
                <p className="text-[13px] text-secondary leading-relaxed">
                  {card.body}
                </p>
                {card.bullets && card.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-[13px] text-secondary pt-2 border-t border-border">
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        <span dangerouslySetInnerHTML={{ __html: b }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Exam Tip Callout: Apple Doc Clean Callout */}
          {chapter.tip && (
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-card border border-border border-l-4 border-l-primary text-xs">
              <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <strong className="text-[13px] font-semibold text-foreground">
                  {isVi ? 'Mẹo thi Apple Certified IT Professional:' : 'DEP110 Exam Strategy Tip:'}
                </strong>
                <p className="text-[13px] text-secondary leading-relaxed">{chapter.tip}</p>
              </div>
            </div>
          )}

          {/* Terms Dictionary */}
          {chapter.terms && chapter.terms.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {isVi ? 'Thuật ngữ Song ngữ Anh — Việt' : 'Bilingual Terminology Reference'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {chapter.terms.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-border bg-card flex flex-col gap-1"
                  >
                    <span className="font-semibold text-xs text-primary font-mono">{t.en}</span>
                    <span className="text-xs text-foreground font-medium">{t.vi}</span>
                    <p className="text-[12px] text-secondary line-clamp-2 mt-0.5">
                      {t.def}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Completion Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-lg bg-card border border-border mt-1">
            <div>
              <strong className="text-sm font-semibold text-foreground">
                {isVi ? `Hoàn tất Chương ${chapter.id}` : `Complete Chapter ${chapter.id}`}
              </strong>
              <p className="text-xs text-secondary">
                {isVi
                  ? 'Đánh dấu hoàn thành để ghi nhận vào tỷ lệ tiến độ tổng thể'
                  : 'Mark as completed to update your overall readiness meter'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleChapterComplete(chapter.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isCompleted
                  ? 'bg-positive text-white'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {isCompleted
                ? isVi ? 'Đã hoàn thành ✓' : 'Completed ✓'
                : isVi ? 'Đánh dấu đã hoàn thành' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && <ComparisonMatrix />}
      {activeTab === 'checkpoint' && (
        <ChapterCheckpoint
          chapterId={chapter.id}
          questions={chapter.quizzes || chapter.checkpoints || []}
        />
      )}
      {activeTab === 'flashcard' && <FlashcardViewer currentChapterId={chapter.id} />}
      {activeTab === 'notes' && <ChapterNotes chapterId={chapter.id} chapterTitle={chapter.title} />}
    </div>
  );
};
