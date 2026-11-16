import React from 'react';
import { notFound } from 'next/navigation';
import { CHAPTERS } from '@/data/chapters';
import { ChapterCheckpoint } from '@/components/learn/ChapterCheckpoint';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface QuizPageProps {
  params: {
    chapterId: string;
  };
}

export function generateStaticParams() {
  return CHAPTERS.map((ch) => ({
    chapterId: String(ch.id),
  }));
}

export default function ChapterQuizPage({ params }: QuizPageProps) {
  const chId = parseInt(params.chapterId, 10);
  const chapter = CHAPTERS.find((c) => c.id === chId);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow={`Checkpoint Quiz • Chương ${chapter.id} / ${CHAPTERS.length}`}
        title={`Kiểm tra Củng cố: ${chapter.title.split(' — ')[0]}`}
        subtitle={`Hoàn thành các câu hỏi checkpoint để củng cố lý thuyết và ghi nhận hoàn thành chương.`}
      />

      <div>
        <Link
          href={`/learn/${chapter.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại nội dung lý thuyết Chương {chapter.id}</span>
        </Link>
        <ChapterCheckpoint
          chapterId={chapter.id}
          questions={chapter.quizzes || chapter.checkpoints || []}
        />
      </div>
    </div>
  );
}
