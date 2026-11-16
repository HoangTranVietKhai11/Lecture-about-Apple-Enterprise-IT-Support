import React from 'react';
import { notFound } from 'next/navigation';
import { CHAPTERS } from '@/data/chapters';
import { ChapterDetail } from '@/components/learn/ChapterDetail';
import { Header } from '@/components/layout/Header';

interface ChapterPageProps {
  params: {
    chapterId: string;
  };
}

export function generateStaticParams() {
  return CHAPTERS.map((ch) => ({
    chapterId: String(ch.id),
  }));
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const chId = parseInt(params.chapterId, 10);
  const chapter = CHAPTERS.find((c) => c.id === chId);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow={`Chương ${chapter.id} / ${CHAPTERS.length} • ${chapter.code}`}
        title={chapter.title}
        subtitle={chapter.lede}
      />
      <ChapterDetail chapter={chapter} totalChapters={CHAPTERS.length} />
    </div>
  );
}
