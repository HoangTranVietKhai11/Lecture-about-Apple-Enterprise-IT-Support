'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useMentorStore } from '@/store/useMentorStore';
import { CHAPTERS } from '@/data/chapters';
import {
  BookOpen,
  GraduationCap,
  Network,
  Terminal,
  Sparkles,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Smartphone,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();
  const { completedChapters, bestExamPct, language, setActiveChapter, setSyncModalOpen } = useAppStore();
  const { toggleOpen: toggleMentor } = useMentorStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isVi = language === 'vi';
  const doneCount = mounted ? completedChapters.length : 0;
  const progressPct = Math.round((doneCount / CHAPTERS.length) * 100);

  const sidebarContent = (
    <div className="flex flex-col gap-5 p-4 text-[13px] h-full overflow-y-auto">
      {/* Platform Branding */}
      <div className="flex flex-col gap-0.5 px-2 pt-1">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary">
          Apple Certified IT Professional
        </span>
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
        >
          <span>DEP110 Platform</span>
        </Link>
        <p className="text-[12px] text-secondary leading-snug">
          {isVi
            ? 'Đào tạo & Luyện thi Apple Deployment'
            : 'Deployment & Management Exam Prep'}
        </p>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-card rounded-md p-3 border border-border flex flex-col gap-2">
        <div className="flex justify-between items-baseline text-[12px] text-secondary">
          <span>{isVi ? 'Tiến độ học tập' : 'Study Progress'}</span>
          <span className="text-foreground font-semibold font-mono">
            {doneCount} / {CHAPTERS.length} ({progressPct}%)
          </span>
        </div>
        <div className="w-full bg-border-subtle h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between items-baseline text-[11px] text-secondary pt-1 border-t border-border">
          <span>{isVi ? 'Điểm thi cao nhất' : 'Best Exam Score'}</span>
          <span className="font-semibold text-positive font-mono">
            {mounted && bestExamPct !== null ? `${bestExamPct}%` : isVi ? 'Chưa thi' : 'None'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            setSyncModalOpen(true);
          }}
          className="mt-0.5 inline-flex items-center justify-center gap-1.5 w-full px-2.5 py-1.5 rounded bg-sidebar hover:bg-surface-high border border-border text-[11px] font-medium text-foreground transition-colors"
        >
          <Smartphone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span>{isVi ? 'Đồng bộ Điện thoại ↔ PC' : 'Sync Phone ↔ PC'}</span>
        </button>
      </div>

      {/* Core Modules Navigation */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary px-2 py-1">
          {isVi ? 'Mô-đun Chuyên sâu' : 'Core Modules'}
        </span>

        <Link
          href="/exam"
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors ${
            pathname.startsWith('/exam')
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-foreground hover:bg-surface-high'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="flex-1">{isVi ? 'Thi thử DEP110 (60Q)' : 'DEP110 Exam (60Q)'}</span>
        </Link>

        <Link
          href="/visualizer"
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors ${
            pathname.startsWith('/visualizer')
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-foreground hover:bg-surface-high'
          }`}
        >
          <Network className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="flex-1">{isVi ? 'Sơ đồ Kiến trúc' : 'Architecture Visualizer'}</span>
        </Link>

        <Link
          href="/lab/terminal"
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors ${
            pathname.startsWith('/lab/terminal')
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-foreground hover:bg-surface-high'
          }`}
        >
          <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="flex-1">{isVi ? 'macOS Terminal Lab' : 'macOS Terminal Lab'}</span>
        </Link>

        <Link
          href="/flashcards"
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors ${
            pathname.startsWith('/flashcards')
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-foreground hover:bg-surface-high'
          }`}
        >
          <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
          <span className="flex-1">{isVi ? 'Flashcards Thuật ngữ' : 'Bilingual Flashcards'}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            toggleMentor();
            setMobileOpen(false);
          }}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors text-foreground hover:bg-surface-high w-full text-left"
        >
          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="flex-1">{isVi ? 'Apple Mentor AI' : 'Apple Mentor AI'}</span>
          <span className="w-2 h-2 rounded-full bg-positive" title="Online" />
        </button>
      </div>

      {/* 14 Chapters Navigation */}
      <div className="flex flex-col gap-0.5 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary px-2 py-1">
          {isVi ? '14 Chương Học' : '14 Learning Chapters'}
        </span>

        {CHAPTERS.map((ch) => {
          const isActive = pathname.startsWith(`/learn/${ch.id}`);
          const isDone = mounted && completedChapters.includes(ch.id);
          const rawTitle = ch.title.split(' — ')[1] || ch.title.replace(/^CHƯƠNG\s*\d+\s*[:—\-]?\s*/i, '');

          return (
            <Link
              key={ch.id}
              href={`/learn/${ch.id}`}
              onClick={() => setActiveChapter(ch.id)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-surface-high'
              }`}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[11px] flex-shrink-0 ${
                  isActive
                    ? 'bg-primary text-white font-bold'
                    : 'bg-card text-secondary border border-border'
                }`}
              >
                {String(ch.id).padStart(2, '0')}
              </span>
              <span className="flex-1 truncate" title={ch.title}>
                {rawTitle}
              </span>
              {isDone && (
                <CheckCircle2
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    isActive ? 'text-primary' : 'text-positive'
                  }`}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar with Drawer Trigger */}
      <div className="lg:hidden w-full bg-sidebar border-b border-border p-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-md border border-border bg-card text-foreground hover:bg-surface-high"
            aria-label="Open Navigation"
          >
            <Menu className="w-4 h-4" />
          </button>
          <Link href="/" className="font-bold text-sm tracking-tight text-foreground">
            DEP110 Platform
          </Link>
        </div>
        <div className="text-[11px] font-mono font-medium text-secondary">
          {doneCount} / {CHAPTERS.length} {isVi ? 'chương' : 'chapters'}
        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-sidebar border-r border-border h-full flex flex-col z-10 shadow-xl">
            <div className="flex justify-between items-center p-3 border-b border-border">
              <span className="text-xs font-bold text-foreground">
                {isVi ? 'Điều hướng DEP110' : 'Navigation Menu'}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-md text-secondary hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:flex w-72 flex-shrink-0 bg-sidebar border-r border-border min-h-screen sticky top-0 h-screen">
        {sidebarContent}
      </aside>
    </>
  );
};
