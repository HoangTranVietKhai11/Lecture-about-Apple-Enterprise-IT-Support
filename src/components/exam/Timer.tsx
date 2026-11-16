'use client';

import React from 'react';
import { useExamStore } from '@/store/useExamStore';
import { Clock } from 'lucide-react';

export const Timer: React.FC = () => {
  const { session } = useExamStore();
  const sec = session.secondsLeft;

  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  const isUrgent = sec <= 300 && sec > 0; // less than 5 minutes

  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-mono font-bold text-sm border transition-colors ${
        isUrgent
          ? 'bg-error-container border-error text-error animate-pulse'
          : 'bg-background border-border text-foreground'
      }`}
    >
      <Clock className="w-3.5 h-3.5 text-primary" />
      <span>{session.finished ? '00:00' : formatted}</span>
    </div>
  );
};
