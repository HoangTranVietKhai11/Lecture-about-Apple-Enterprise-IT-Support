'use client';

import React from 'react';
import { useExamStore } from '@/store/useExamStore';
import { useAppStore } from '@/store/useAppStore';
import { Header } from '@/components/layout/Header';
import { ExamSetup } from '@/components/exam/ExamSetup';
import { ExamInterface } from '@/components/exam/ExamInterface';
import { ExamResult } from '@/components/exam/ExamResult';
import { ExamHistory } from '@/components/exam/ExamHistory';

export default function ExamPage() {
  const { session } = useExamStore();
  const { language } = useAppStore();
  const isVi = language === 'vi';

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow="Apple Certified IT Professional — DEP110"
        title={isVi ? 'Phòng Thi Thử DEP110 Pearson VUE' : 'DEP110 Exam Simulator'}
        subtitle={
          isVi
            ? 'Mô phỏng chuẩn phòng thi Pearson VUE: 60 câu hỏi ngẫu nhiên trong 60 phút, điểm đỗ 75% (45/60 câu), bảng điều hướng và đánh dấu xem lại.'
            : 'Pearson VUE standard exam environment: 60 random questions in 60 minutes, 75% passing grade.'
        }
      />

      {!session.started && (
        <div className="flex flex-col gap-6">
          <ExamSetup />
          <ExamHistory />
        </div>
      )}
      {session.started && !session.finished && <ExamInterface />}
      {session.finished && (
        <div className="flex flex-col gap-6">
          <ExamResult />
          <ExamHistory />
        </div>
      )}
    </div>
  );
}
