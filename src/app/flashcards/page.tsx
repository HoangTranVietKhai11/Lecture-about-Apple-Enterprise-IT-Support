'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { FlashcardViewer } from '@/components/learn/FlashcardViewer';
import { useAppStore } from '@/store/useAppStore';

export default function FlashcardsPage() {
  const { language } = useAppStore();
  const isVi = language === 'vi';

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow="Spaced Repetition Flashcard Engine"
        title={isVi ? 'Ôn Luyện Thuật Ngữ Song Ngữ Apple DEP110' : 'Bilingual Apple DEP110 Flashcards'}
        subtitle={
          isVi
            ? 'Phương pháp lặp lại ngắt quãng (Spaced Repetition): Nhấn thẻ để lật mặt xem nghĩa tiếng Việt và bối cảnh thi chứng chỉ Apple Certified IT Professional.'
            : 'Master Apple deployment acronyms and terminology with interactive 3D flip flashcards.'
        }
      />

      <div className="bg-surface-low border border-border rounded-lg p-6">
        <FlashcardViewer />
      </div>
    </div>
  );
}
