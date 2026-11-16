'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Download, Trash2, CheckCircle2 } from 'lucide-react';

interface ChapterNotesProps {
  chapterId: number;
  chapterTitle: string;
}

export const ChapterNotes: React.FC<ChapterNotesProps> = ({ chapterId, chapterTitle }) => {
  const { chapterNotes, setChapterNote, language } = useAppStore();
  const isVi = language === 'vi';

  const [text, setText] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>(isVi ? 'Đã lưu' : 'Saved');

  useEffect(() => {
    setText(chapterNotes[chapterId] || '');
  }, [chapterId, chapterNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setSaveStatus(isVi ? 'Đang lưu...' : 'Saving...');
    setChapterNote(chapterId, val);
    setTimeout(() => {
      setSaveStatus(isVi ? 'Đã lưu' : 'Saved');
    }, 600);
  };

  const insertTemplate = (type: 'trap' | 'cli' | 'checklist') => {
    let tpl = '';
    if (type === 'trap') {
      tpl = `\n[BẪY ĐỀ THI DEP110 — CHƯƠNG ${chapterId}]\n• Trọng tâm thi:\n• Cần phân biệt kỹ:\n  - Khái niệm A:\n  - Khái niệm B:\n`;
    } else if (type === 'cli') {
      tpl = `\n[LỆNH CLI CHẨN ĐOÁN CẦN NHỚ]\n$ profiles status -type enrollment\n$ nc -vz gateway.push.apple.com 5223\n$ app-sso platform -s\n$ fdesetup status\n`;
    } else if (type === 'checklist') {
      tpl = `\n[CHECKLIST TRIỂN KHAI DOANH NGHIỆP]\n[ ] Bước 1: Chuẩn bị cổng mạng và firewall\n[ ] Bước 2: Đồng bộ thiết bị qua Apple Business\n[ ] Bước 3: Đẩy Configuration Profiles và DDM\n[ ] Bước 4: Kiểm thử với tài khoản người dùng\n`;
    }
    const updated = text ? `${text}\n${tpl}` : tpl;
    setText(updated);
    setChapterNote(chapterId, updated);
  };

  const handleExport = () => {
    const content = `GHI CHÚ ÔN THI DEP110 — CHƯƠNG ${chapterId}: ${chapterTitle}\nXuất ngày: ${new Date().toLocaleString()}\n----------------------------------------\n\n${text}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DEP110_Note_Chapter_${chapterId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm(isVi ? 'Xóa toàn bộ ghi chú của chương này?' : 'Clear all notes for this chapter?')) {
      setText('');
      setChapterNote(chapterId, '');
    }
  };

  return (
    <div className="flex flex-col gap-3.5 bg-card border border-border rounded-lg p-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {isVi ? `Sổ tay ghi chú Chương ${chapterId}` : `Personal Notes: Chapter ${chapterId}`}
          </h3>
          <p className="text-xs text-secondary">
            {isVi ? 'Tự động lưu vào trình duyệt' : 'Automatically saved to your browser'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-secondary hover:text-foreground hover:bg-surface-high text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isVi ? 'Tải .txt' : 'Export .txt'}</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-card text-secondary hover:text-error hover:border-error/40 text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isVi ? 'Xóa' : 'Clear'}</span>
          </button>
        </div>
      </div>

      {/* Quick template chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-medium text-secondary uppercase tracking-wider mr-1">
          {isVi ? 'Mẫu nhanh:' : 'Templates:'}
        </span>
        <button
          type="button"
          onClick={() => insertTemplate('trap')}
          className="text-xs font-mono px-2 py-0.5 rounded bg-sidebar border border-border text-secondary hover:text-primary hover:border-primary/40 transition-colors"
        >
          + {isVi ? 'Bẫy đề thi' : 'Exam Trap'}
        </button>
        <button
          type="button"
          onClick={() => insertTemplate('cli')}
          className="text-xs font-mono px-2 py-0.5 rounded bg-sidebar border border-border text-secondary hover:text-primary hover:border-primary/40 transition-colors"
        >
          + {isVi ? 'Lệnh CLI' : 'CLI Commands'}
        </button>
        <button
          type="button"
          onClick={() => insertTemplate('checklist')}
          className="text-xs font-mono px-2 py-0.5 rounded bg-sidebar border border-border text-secondary hover:text-primary hover:border-primary/40 transition-colors"
        >
          + {isVi ? 'Checklist' : 'Checklist'}
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[11px] font-mono text-secondary">
          <span>{text.length} {isVi ? 'ký tự' : 'characters'}</span>
          <span className="text-positive flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{saveStatus}</span>
          </span>
        </div>

        <textarea
          value={text}
          onChange={handleChange}
          rows={9}
          className="w-full bg-card border border-border rounded-md p-3 text-xs font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
          placeholder={
            isVi
              ? 'Nhập các ghi chú cá nhân, mẹo giải đề, lỗi thường gặp trong kỳ thi DEP110 của chương này...'
              : 'Write your key takeaways, traps, and exam notes here...'
          }
        />
      </div>
    </div>
  );
};
