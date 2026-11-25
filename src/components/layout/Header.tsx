'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { RotateCcw, Smartphone } from 'lucide-react';

interface HeaderProps {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, eyebrow, subtitle }) => {
  const { language, resetAllProgress, setSyncModalOpen } = useAppStore();
  const isVi = language === 'vi';

  const handleReset = () => {
    if (confirm(isVi ? 'Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập và bài thi?' : 'Reset all progress and exam records?')) {
      resetAllProgress();
    }
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-border">
      <div className="flex flex-col gap-1 max-w-2xl">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl lg:text-[28px] font-bold tracking-tight text-foreground leading-tight">
          {title || (isVi ? 'Trung tâm Đào tạo Apple Enterprise DEP110' : 'Apple Enterprise DEP110 Hub')}
        </h1>
        {subtitle && (
          <p className="text-sm text-secondary leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => setSyncModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium"
          title={isVi ? 'Đồng bộ tiến độ giữa Điện thoại và Máy tính' : 'Sync progress across Phone and PC'}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{isVi ? 'Đồng bộ' : 'Sync'}</span>
        </button>
        <LanguageToggle />
        <ThemeToggle />
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-secondary hover:text-error hover:border-error/40 transition-colors text-xs font-medium"
          title={isVi ? 'Đặt lại dữ liệu tiến độ' : 'Reset progress'}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isVi ? 'Đặt lại' : 'Reset'}</span>
        </button>
      </div>
    </header>
  );
};
