'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ExamAttemptRecord } from '@/types';
import {
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Trash2,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const ExamHistory: React.FC = () => {
  const { examHistory, clearExamHistory, language } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isVi = language === 'vi';
  const history = mounted ? examHistory || [] : [];

  if (history.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-5 flex flex-col items-center justify-center text-center gap-2">
        <TrendingUp className="w-8 h-8 text-secondary/60 stroke-[1.5]" />
        <h4 className="text-sm font-semibold text-foreground">
          {isVi ? 'Chưa có lịch sử làm bài thi' : 'No Exam Attempts Recorded'}
        </h4>
        <p className="text-xs text-secondary max-w-md">
          {isVi
            ? 'Kết quả các lần thi thử Pearson VUE và luyện tập chuyên sâu sẽ tự động được ghi nhận tại đây cùng biểu đồ tiến bộ.'
            : 'Your test attempts, duration, and score trajectory will be automatically charted here.'}
        </p>
      </div>
    );
  }

  // Calculate statistics
  const totalAttempts = history.length;
  const passedAttempts = history.filter((h) => h.passed).length;
  const passRate = Math.round((passedAttempts / totalAttempts) * 100);
  const avgScore = Math.round(
    history.reduce((acc, h) => acc + h.percentage, 0) / totalAttempts
  );
  const bestScore = Math.max(...history.map((h) => h.percentage));

  // Chronological order (oldest to newest) for chart display
  const chronological = [...history].reverse();

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const handleClear = () => {
    if (
      confirm(
        isVi
          ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử các lần thi thử?'
          : 'Clear all exam attempt history?'
      )
    ) {
      clearExamHistory();
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-card border border-border rounded-lg p-4">
      {/* Header & Metrics Strip */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            {isVi ? 'Lịch sử Thi Thử & Biểu Đồ Tiến Bộ' : 'Exam History & Score Progression'}
          </h3>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-sidebar border border-border text-secondary">
            {totalAttempts} {isVi ? 'lần thi' : 'attempts'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-error transition-colors"
          title={isVi ? 'Xóa lịch sử thi' : 'Clear history'}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isVi ? 'Xóa lịch sử' : 'Clear history'}</span>
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-sidebar border border-border rounded-md p-2.5 flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
            {isVi ? 'Lần thi gần nhất' : 'Latest Score'}
          </span>
          <span className="text-base font-bold font-mono text-foreground">
            {history[0].percentage}%
          </span>
          <span
            className={`text-[11px] font-medium ${
              history[0].passed ? 'text-positive' : 'text-error'
            }`}
          >
            {history[0].passed ? (isVi ? 'Đạt chuẩn ✓' : 'Passed ✓') : isVi ? 'Chưa đạt' : 'Failed'}
          </span>
        </div>

        <div className="bg-sidebar border border-border rounded-md p-2.5 flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
            {isVi ? 'Điểm cao nhất' : 'Highest Score'}
          </span>
          <span className="text-base font-bold font-mono text-positive">
            {bestScore}%
          </span>
          <span className="text-[11px] text-secondary">
            {isVi ? 'Mục tiêu: ≥ 75%' : 'Benchmark: ≥ 75%'}
          </span>
        </div>

        <div className="bg-sidebar border border-border rounded-md p-2.5 flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
            {isVi ? 'Điểm trung bình' : 'Average Score'}
          </span>
          <span className="text-base font-bold font-mono text-foreground">
            {avgScore}%
          </span>
          <span className="text-[11px] text-secondary">
            {totalAttempts} {isVi ? 'lần làm bài' : 'total tests'}
          </span>
        </div>

        <div className="bg-sidebar border border-border rounded-md p-2.5 flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
            {isVi ? 'Tỷ lệ thi đỗ' : 'Pass Rate'}
          </span>
          <span className="text-base font-bold font-mono text-foreground">
            {passRate}%
          </span>
          <span className="text-[11px] text-secondary">
            {passedAttempts} / {totalAttempts} {isVi ? 'lần vượt qua' : 'passed'}
          </span>
        </div>
      </div>

      {/* Visual Progression Chart */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex justify-between items-center text-[11px] text-secondary">
          <span className="font-medium uppercase tracking-wider">
            {isVi ? 'Biểu đồ lộ trình điểm số (Qua các lần thi)' : 'Score Trajectory Timeline'}
          </span>
          <span className="flex items-center gap-1.5 font-mono">
            <span className="w-2.5 h-0.5 bg-primary inline-block" />
            <span>{isVi ? 'Đường chuẩn đỗ 75%' : '75% Pass Benchmark'}</span>
          </span>
        </div>

        {/* Minimalist Bar Chart with 75% Pass Benchmark Line */}
        <div className="relative bg-sidebar border border-border rounded-md p-4 pt-6 h-40 flex items-end gap-2 overflow-x-auto">
          {/* Benchmark Line (75%) */}
          <div
            className="absolute left-0 right-0 border-b border-dashed border-primary/60 z-10 pointer-events-none"
            style={{ bottom: '75%' }}
          >
            <span className="absolute right-2 -top-4 text-[10px] font-mono text-primary font-semibold bg-sidebar px-1 rounded">
              75% Pass
            </span>
          </div>

          {/* Chronological Bars */}
          <div className="flex items-end gap-3 min-w-full h-full pb-1 z-0">
            {chronological.map((att, idx) => {
              const isPassed = att.passed;
              return (
                <div
                  key={att.id || idx}
                  className="flex-1 min-w-[36px] max-w-[60px] h-full flex flex-col justify-end items-center group relative cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-[#171717] text-white text-[10px] rounded px-2 py-1 font-mono pointer-events-none whitespace-nowrap z-20 shadow-md">
                    <div>{att.percentage}% ({att.score}/{att.totalQuestions})</div>
                    <div className="text-gray-300">{formatDate(att.date)}</div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold text-secondary mb-1">
                    {att.percentage}%
                  </span>

                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      isPassed
                        ? 'bg-positive/80 hover:bg-positive'
                        : 'bg-error/70 hover:bg-error'
                    }`}
                    style={{ height: `${Math.max(8, att.percentage)}%` }}
                  />

                  <span className="text-[10px] font-mono text-secondary mt-1">
                    #{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Attempt List Table */}
      <div className="flex flex-col gap-2 pt-2">
        <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
          {isVi ? 'Bảng ghi chi tiết các lần thi' : 'Detailed Attempts Log'}
        </span>

        <div className="overflow-x-auto border border-border rounded-md">
          <table className="w-full text-xs border-collapse min-w-[540px]">
            <thead>
              <tr className="bg-sidebar border-b border-border text-[11px] font-semibold text-secondary uppercase tracking-wider">
                <th className="text-left py-2 px-3">{isVi ? 'Thời gian' : 'Date & Time'}</th>
                <th className="text-left py-2 px-3">{isVi ? 'Chế độ thi' : 'Mode'}</th>
                <th className="text-center py-2 px-3">{isVi ? 'Thời lượng' : 'Duration'}</th>
                <th className="text-center py-2 px-3">{isVi ? 'Điểm số' : 'Score'}</th>
                <th className="text-right py-2 px-3">{isVi ? 'Kết quả' : 'Result'}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((att, idx) => (
                <tr
                  key={att.id || idx}
                  className="border-b border-border hover:bg-surface-high/40 transition-colors"
                >
                  <td className="py-2.5 px-3 text-secondary font-mono text-[11px]">
                    {formatDate(att.date)}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-foreground">
                    <div className="truncate max-w-[220px]" title={att.title}>
                      {att.title}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center text-secondary font-mono text-[11px]">
                    {formatDuration(att.timeSpentSeconds)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-foreground">
                    {att.score} / {att.totalQuestions} ({att.percentage}%)
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        att.passed
                          ? 'bg-positive/10 text-positive'
                          : 'bg-error/10 text-error'
                      }`}
                    >
                      {att.passed ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isVi ? 'ĐẠT' : 'PASS'}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>{isVi ? 'CHƯA ĐẠT' : 'FAIL'}</span>
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
