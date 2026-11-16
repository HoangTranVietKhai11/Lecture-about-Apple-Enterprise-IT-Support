'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useAppStore();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-secondary hover:text-foreground hover:bg-surface-high transition-colors text-xs font-medium"
      title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <Languages className="w-3.5 h-3.5 text-secondary" />
      <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
    </button>
  );
};
