'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, language } = useAppStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-secondary hover:text-foreground hover:bg-surface-high transition-colors text-xs font-medium"
      title={theme === 'light' ? 'Chuyển sang Giao diện Tối' : 'Chuyển sang Giao diện Sáng'}
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-3.5 h-3.5 text-secondary" />
          <span>{language === 'vi' ? 'Tối' : 'Dark'}</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-secondary" />
          <span>{language === 'vi' ? 'Sáng' : 'Light'}</span>
        </>
      )}
    </button>
  );
};
