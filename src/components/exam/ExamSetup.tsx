'use client';

import React, { useState } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { useAppStore } from '@/store/useAppStore';
import { EXAM_BANK } from '@/data/exam-bank';
import { CHAPTERS } from '@/data/chapters';
import { ExamQuestion } from '@/types';
import { Play, Sparkles, BookOpen } from 'lucide-react';

export const ExamSetup: React.FC = () => {
  const { startExam } = useExamStore();
  const { language } = useAppStore();
  const isVi = language === 'vi';

  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const handleStartTimed = () => {
    startExam('TIMED');
  };

  const handleStartPractice = () => {
    let pool = [...EXAM_BANK];
    if (selectedTopic !== 'ALL') {
      pool = pool.filter((q) => q.domain === selectedTopic);
    }
    const title =
      selectedTopic === 'ALL'
        ? isVi ? `LUYỆN TẬP TOÀN BỘ (${pool.length} CÂU)` : `PRACTICE ALL (${pool.length} QUESTIONS)`
        : isVi ? `LUYỆN TẬP CHUYÊN ĐỀ: ${selectedTopic} (${pool.length} CÂU)` : `TOPIC: ${selectedTopic} (${pool.length} QUESTIONS)`;
    startExam('PRACTICE', pool, title);
  };

  const handleStartChapterExam = () => {
    const ch = CHAPTERS.find((c) => c.id === selectedChapter) || CHAPTERS[0];
    const domainMap: Record<number, string[]> = {
      1: ['DDM & Profiles', 'ADE & Enrollment'],
      2: ['DDM & Profiles'],
      3: ['ADE & Enrollment'],
      4: ['ADE & Enrollment'],
      5: ['ADE & Enrollment'],
      6: ['APNs & Network'],
      7: ['Platform SSO & Identity'],
      8: ['Platform SSO & Identity'],
      9: ['DDM & Profiles'],
      10: ['Security & Updates', 'DDM & Profiles'],
      11: ['Jamf & AppConfig'],
      12: ['APNs & Network'],
      13: ['Security & Updates'],
      14: ['Jamf & AppConfig', 'Security & Updates'],
    };

    const targetDomains = domainMap[selectedChapter] || ['DDM & Profiles'];
    const bankQuestions = EXAM_BANK.filter((q) => targetDomains.includes(q.domain));

    // Convert checkpoints to questions
    const sourceQuestions = ch.quizzes || ch.checkpoints || [];
    const cpQuestions: ExamQuestion[] = sourceQuestions.map((cp, idx) => ({
      id: `cp_${ch.id}_${idx}`,
      chapterId: ch.id,
      topic: 'DECLARATIVE_MANAGEMENT_DDM',
      domain: targetDomains[0],
      qVn: `[Checkpoint ${ch.code}] ${cp.q}`,
      qEn: `[Checkpoint ${ch.code}] ${cp.q}`,
      opts: cp.opts,
      optsEn: cp.opts,
      ans: cp.ans,
      expVn: cp.exp,
      expEn: cp.exp,
    }));

    const pool = [...cpQuestions, ...bankQuestions];
    const title = isVi
      ? `THI CHUYÊN SÂU ${ch.code}: ${ch.title.split(' — ')[0].toUpperCase()} (${pool.length} CÂU)`
      : `CHAPTER ${ch.id} EXAM: ${ch.title.split(' — ')[0].toUpperCase()} (${pool.length} QUESTIONS)`;

    startExam('CHAPTER', pool, title);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mode 1: Pearson VUE Timed Exam */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary w-fit">
              Pearson VUE Standard
            </span>
            <h3 className="text-[15px] font-semibold text-foreground">
              {isVi ? 'Thi thử 60 phút' : 'Timed Exam (60M)'}
            </h3>
            <ul className="text-xs text-secondary space-y-1 list-disc list-inside">
              <li>
                {isVi ? 'Bốc ngẫu nhiên 60 câu từ ngân hàng' : '60 random questions'}
              </li>
              <li>
                {isVi ? '60 phút đếm ngược, chuẩn Pearson VUE' : '60 minutes countdown'}
              </li>
              <li>
                {isVi ? 'Điểm đỗ: ≥ 75% (45 / 60 câu)' : 'Passing score: ≥ 75%'}
              </li>
              <li>
                {isVi ? 'Ẩn đáp án tới khi nộp bài' : 'Hidden answers until submitted'}
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={handleStartTimed}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isVi ? 'Bắt đầu Thi Thử 60 Phút' : 'Start 60-Min Exam'}</span>
          </button>
        </div>

        {/* Mode 2: Topic Practice */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-border-subtle text-secondary w-fit">
              Instant Feedback
            </span>
            <h3 className="text-[15px] font-semibold text-foreground">
              {isVi ? 'Luyện tập theo chuyên đề' : 'Practice by Topic'}
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              {isVi
                ? 'Không giới hạn thời gian, hiển thị giải thích đúng/sai ngay lập tức.'
                : 'Untimed practice with immediate answer validation.'}
            </p>
            <div className="flex flex-col gap-1 pt-1">
              <label className="text-[11px] font-medium text-secondary uppercase tracking-wider">
                {isVi ? 'Chọn chuyên đề' : 'Select Topic'}
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full text-xs bg-card border border-border rounded-md px-2.5 py-1.5 text-foreground font-medium"
              >
                <option value="ALL">{isVi ? 'Tất cả 120 câu hỏi ngân hàng' : 'All 120 questions'}</option>
                <option value="DDM & Profiles">DDM, Profiles & Payloads</option>
                <option value="ADE & Enrollment">ADE, Supervision & Enrollment</option>
                <option value="APNs & Network">APNs (Port 5223), Caching & VPN</option>
                <option value="Platform SSO & Identity">Platform SSO & Managed Apple Accounts</option>
                <option value="Jamf & AppConfig">Jamf Policy vs Profile & AppConfig</option>
                <option value="Security & Updates">FileVault, Attestation & OS Updates</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartPractice}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card text-foreground text-xs font-medium hover:bg-surface-high transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>{isVi ? 'Bắt đầu Luyện Tập' : 'Start Practice'}</span>
          </button>
        </div>

        {/* Mode 3: Chapter Focus */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-border-subtle text-secondary w-fit">
              Chapter Focus
            </span>
            <h3 className="text-[15px] font-semibold text-foreground">
              {isVi ? 'Thi theo từng chương' : 'Chapter Exam'}
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              {isVi
                ? 'Tổng hợp câu hỏi checkpoint và ngân hàng đề thi thuộc 1 chương cụ thể.'
                : 'Targeted assessment combining chapter checkpoint questions.'}
            </p>
            <div className="flex flex-col gap-1 pt-1">
              <label className="text-[11px] font-medium text-secondary uppercase tracking-wider">
                {isVi ? 'Chọn chương' : 'Select Chapter'}
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(Number(e.target.value))}
                className="w-full text-xs bg-card border border-border rounded-md px-2.5 py-1.5 text-foreground font-medium"
              >
                {CHAPTERS.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Chương {ch.id}: {ch.title.split(' — ')[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartChapterExam}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card text-foreground text-xs font-medium hover:bg-surface-high transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-secondary" />
            <span>{isVi ? 'Thi Theo Chương' : 'Start Chapter Exam'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
