'use client';

import React, { useState, useEffect } from 'react';
import { CHAPTERS } from '@/data/chapters';
import { useAppStore } from '@/store/useAppStore';
import { RotateCw, CheckCircle2, RotateCcw, Shuffle, ArrowLeft, ArrowRight } from 'lucide-react';

interface FlashcardViewerProps {
  currentChapterId?: number;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ currentChapterId }) => {
  const { masteredTerms, toggleMasteredTerm, language } = useAppStore();
  const isVi = language === 'vi';

  const [scope, setScope] = useState<'chapter' | 'all'>('chapter');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cards, setCards] = useState<Array<{ en: string; vi: string; def: string; chapterCode: string; chapterId: number }>>([]);

  // Build card pool
  useEffect(() => {
    let pool: Array<{ en: string; vi: string; def: string; chapterCode: string; chapterId: number }> = [];
    if (scope === 'all') {
      CHAPTERS.forEach((ch) => {
        (ch.terms || []).forEach((t) => {
          pool.push({ ...t, chapterCode: ch.code, chapterId: ch.id });
        });
      });
    } else {
      const activeId = currentChapterId || 1;
      const ch = CHAPTERS.find((c) => c.id === activeId) || CHAPTERS[0];
      pool = (ch.terms || []).map((t) => ({ ...t, chapterCode: ch.code, chapterId: ch.id }));
    }
    setCards(pool);
    setCurrentIdx(0);
    setIsFlipped(false);
  }, [scope, currentChapterId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
        stepCard(1);
      } else if (e.code === 'ArrowLeft') {
        stepCard(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length, currentIdx]);

  const stepCard = (delta: number) => {
    setIsFlipped(false);
    setCurrentIdx((prev) => {
      const next = prev + delta;
      if (next >= 0 && next < cards.length) return next;
      return prev;
    });
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setCurrentIdx(0);
    setIsFlipped(false);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-secondary bg-card border border-border rounded-lg">
        {isVi ? 'Không có thuật ngữ nào để hiển thị.' : 'No flashcards available.'}
      </div>
    );
  }

  const card = cards[currentIdx];
  const isMastered = masteredTerms.includes(card.en);
  const masteredInPool = cards.filter((c) => masteredTerms.includes(c.en)).length;
  const progressPct = Math.round((masteredInPool / cards.length) * 100);

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value as 'chapter' | 'all')}
            className="text-xs bg-card border border-border rounded-md px-2.5 py-1.5 font-medium text-foreground"
          >
            <option value="chapter">{isVi ? 'Chương hiện tại' : 'Current Chapter'}</option>
            <option value="all">{isVi ? 'Tất cả 14 chương' : 'All 14 Chapters'}</option>
          </select>

          <button
            type="button"
            onClick={shuffleCards}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground hover:bg-surface-high transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>{isVi ? 'Xáo trộn' : 'Shuffle'}</span>
          </button>
        </div>

        <div className="text-xs font-mono text-secondary">
          <span className="text-positive font-semibold">{masteredInPool}</span> / {cards.length} {isVi ? 'đã thuộc' : 'mastered'} ({progressPct}%)
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-border-subtle h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-positive h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="flashcard-scene cursor-pointer h-60 w-full"
      >
        <div className={`flashcard-inner h-full w-full ${isFlipped ? 'is-flipped' : ''}`}>
          {/* Front Face */}
          <div className="flashcard-face flashcard-front bg-card border border-border">
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-0.5 rounded bg-sidebar border border-border text-secondary font-mono text-[11px]">
                {card.chapterCode}
              </span>
              <span className="text-secondary font-mono text-[11px]">
                {currentIdx + 1} / {cards.length}
              </span>
            </div>

            <div className="my-auto flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold font-mono text-foreground tracking-tight">
                {card.en}
              </span>
              <span className="text-[11px] text-secondary flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                <span>{isVi ? 'Nhấp chuột hoặc phím Space để lật thẻ' : 'Click or press Space to flip'}</span>
              </span>
            </div>

            <div className="text-[11px] text-secondary text-center">
              Apple Platform Deployment Bilingual Flashcard
            </div>
          </div>

          {/* Back Face */}
          <div className="flashcard-face flashcard-back bg-card border border-border border-l-4 border-l-primary">
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-0.5 rounded bg-sidebar border border-border text-secondary font-mono text-[11px]">
                {card.chapterCode}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  isMastered ? 'bg-positive/10 text-positive' : 'bg-sidebar text-secondary'
                }`}
              >
                {isMastered ? (isVi ? 'ĐÃ THUỘC' : 'MASTERED') : isVi ? 'CẦN ÔN LẠI' : 'REVIEW'}
              </span>
            </div>

            <div className="my-auto flex flex-col gap-1.5 text-center px-3">
              <h4 className="text-base font-semibold text-foreground">
                {card.vi}
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                {card.def}
              </p>
            </div>

            <div className="text-[11px] text-secondary text-center">
              {isVi ? 'Bấm để lật lại tiếng Anh' : 'Click to flip back'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-1">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => stepCard(-1)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isVi ? 'Thẻ trước' : 'Previous'}</span>
          </button>

          <button
            type="button"
            disabled={currentIdx === cards.length - 1}
            onClick={() => stepCard(1)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>{isVi ? 'Thẻ sau' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleMasteredTerm(card.en)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            isMastered
              ? 'border-positive/40 bg-positive/10 text-positive'
              : 'border-border bg-card text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isMastered ? (isVi ? 'Đã thuộc từ này' : 'Mastered') : isVi ? 'Đánh dấu đã thuộc' : 'Mark Mastered'}</span>
        </button>
      </div>
    </div>
  );
};
