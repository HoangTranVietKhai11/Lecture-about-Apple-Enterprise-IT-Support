'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { encodeSyncPayload, decodeSyncPayload, sanitizeSyncPayload } from '@/lib/syncCodec';
import { SyncPayload, SyncMode } from '@/types';
import {
  X,
  RefreshCw,
  Copy,
  Check,
  Share2,
  Download,
  Upload,
  CloudUpload,
  CloudDownload,
  Smartphone,
} from 'lucide-react';

type ActiveTab = 'QUICK' | 'BACKUP';

export const SyncModal: React.FC = () => {
  const {
    language,
    completedChapters,
    masteredTerms,
    examHistory,
    bestExamPct,
    lastSyncedAt,
    syncPasskey,
    syncModalOpen,
    setSyncModalOpen,
    setSyncPasskey,
    exportSyncPayload,
    applySyncPayload,
  } = useAppStore();

  const isVi = language === 'vi';
  const [activeTab, setActiveTab] = useState<ActiveTab>('QUICK');
  const [pasteInput, setPasteInput] = useState<string>('');
  const [pendingPayload, setPendingPayload] = useState<SyncPayload | null>(null);
  const [copiedType, setCopiedType] = useState<'LINK' | 'CODE' | null>(null);
  const [canNativeShare, setCanNativeShare] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [cloudLoading, setCloudLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect native share capability & auto-detect ?sync=... URL param on page load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }

    const params = new URLSearchParams(window.location.search);
    const syncToken = params.get('sync');
    if (syncToken) {
      decodeSyncPayload(syncToken).then((decoded) => {
        if (decoded) {
          setPendingPayload(decoded);
          setSyncModalOpen(true);
          setStatusMsg({
            type: 'ok',
            text: isVi
              ? 'Đã nhận dữ liệu đồng bộ từ đường dẫn! Chọn Hợp nhất hoặc Ghi đè bên dưới.'
              : 'Sync data detected from link! Choose Merge or Replace below.',
          });
        } else {
          setSyncModalOpen(true);
          setStatusMsg({
            type: 'err',
            text: isVi
              ? 'Mã đồng bộ trên đường dẫn không hợp lệ hoặc bị cắt ngắn.'
              : 'Sync token in URL is invalid or truncated.',
          });
        }
        // Clean ?sync= from URL without reloading page
        params.delete('sync');
        const rest = params.toString();
        const cleanUrl = `${window.location.pathname}${rest ? `?${rest}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', cleanUrl);
      });
    }
  }, [isVi, setSyncModalOpen]);

  // Decode pasted input live for preview
  useEffect(() => {
    if (!pasteInput.trim()) return;
    let cancelled = false;
    decodeSyncPayload(pasteInput).then((decoded) => {
      if (!cancelled) {
        setPendingPayload(decoded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [pasteInput]);

  if (!syncModalOpen) return null;

  const closeModal = () => {
    setSyncModalOpen(false);
    setStatusMsg(null);
  };

  const buildSyncUrlAndToken = async (): Promise<{ url: string; token: string }> => {
    const payload = exportSyncPayload();
    const token = await encodeSyncPayload(payload);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return {
      token,
      url: `${origin}/?sync=${encodeURIComponent(token)}`,
    };
  };

  const handleCopyLink = async () => {
    try {
      const { url } = await buildSyncUrlAndToken();
      await navigator.clipboard.writeText(url);
      setCopiedType('LINK');
      setStatusMsg({
        type: 'ok',
        text: isVi
          ? 'Đã sao chép Link đồng bộ! Gửi qua Zalo / Tin nhắn / AirDrop sang thiết bị kia và bấm mở link.'
          : 'Sync link copied! Send it to your other device and open the link.',
      });
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Không thể sao chép tự động. Hãy thử nút Sao chép Mã hoặc Xuất File.' : 'Clipboard copy failed.',
      });
    }
  };

  const handleCopyCode = async () => {
    try {
      const { token } = await buildSyncUrlAndToken();
      await navigator.clipboard.writeText(token);
      setCopiedType('CODE');
      setStatusMsg({
        type: 'ok',
        text: isVi
          ? 'Đã sao chép Mã đồng bộ nén! Dán mã này vào ô bên dưới trên thiết bị kia.'
          : 'Sync code copied! Paste it into the box on your other device.',
      });
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Không thể sao chép vào bộ nhớ tạm.' : 'Clipboard copy failed.',
      });
    }
  };

  const handleNativeShare = async () => {
    try {
      const { url } = await buildSyncUrlAndToken();
      await navigator.share({
        title: 'Apple DEP110 — Sync Study Progress',
        text: isVi
          ? 'Mở link này để đồng bộ tiến độ học & lịch sử thi Apple DEP110:'
          : 'Open this link to sync your Apple DEP110 study progress:',
        url,
      });
    } catch {
      // User cancelled native share sheet; no error toast needed
    }
  };

  const handleApplyPending = (mode: SyncMode) => {
    if (!pendingPayload) {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Vui lòng dán Link hoặc Mã đồng bộ hợp lệ trước.' : 'Please paste a valid sync link or code first.',
      });
      return;
    }
    applySyncPayload(pendingPayload, mode);
    setPasteInput('');
    setPendingPayload(null);
    setStatusMsg({
      type: 'ok',
      text:
        mode === 'MERGE'
          ? isVi
            ? 'Đã hợp nhất tiến độ học & lịch sử thi thành công!'
            : 'Progress and exam history merged successfully!'
          : isVi
            ? 'Đã ghi đè tiến độ từ thiết bị kia thành công!'
            : 'Progress replaced successfully!',
    });
  };

  const handleExportJsonFile = () => {
    const payload = exportSyncPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateTag = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `dep110-progress-${dateTag}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg({
      type: 'ok',
      text: isVi ? 'Đã tải xuống file sao lưu .json!' : 'Backup .json file downloaded!',
    });
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const sanitized = sanitizeSyncPayload(parsed);
        if (!sanitized) {
          setStatusMsg({
            type: 'err',
            text: isVi ? 'File JSON không đúng định dạng tiến độ DEP110.' : 'Invalid DEP110 backup JSON file.',
          });
          return;
        }
        applySyncPayload(sanitized, 'MERGE');
        setStatusMsg({
          type: 'ok',
          text: isVi ? 'Đã nhập và hợp nhất dữ liệu từ file JSON thành công!' : 'JSON backup imported and merged!',
        });
      } catch {
        setStatusMsg({
          type: 'err',
          text: isVi ? 'Không thể đọc file JSON.' : 'Failed to parse JSON file.',
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCloudPush = async () => {
    const cleanKey = syncPasskey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (cleanKey.length < 4) {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Mã cá nhân cần tối thiểu 4 ký tự chữ/số (VD: khai-dep110).' : 'Sync ID must be at least 4 alphanumeric characters.',
      });
      return;
    }
    setCloudLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syncKey: cleanKey,
          payload: exportSyncPayload(),
        }),
      });
      const data = (await res.json()) as { success: boolean; error?: string };
      if (res.ok && data.success) {
        setSyncPasskey(cleanKey);
        setStatusMsg({
          type: 'ok',
          text: isVi
            ? `Đã lưu tiến độ lên Cloud với mã "${cleanKey}"!`
            : `Saved progress to Cloud under ID "${cleanKey}"!`,
        });
      } else {
        setStatusMsg({
          type: 'err',
          text: isVi
            ? 'Server hiện chưa kết nối PostgreSQL Cloud. Bạn hãy dùng tab "Link & Mã nhanh" hoặc File JSON để đồng bộ ngay không cần DB!'
            : 'Cloud database not configured on server. Please use the Quick Link/Code tab instead!',
        });
      }
    } catch {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Lỗi kết nối tới máy chủ đồng bộ.' : 'Network error while syncing.',
      });
    } finally {
      setCloudLoading(false);
    }
  };

  const handleCloudPull = async () => {
    const cleanKey = syncPasskey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (cleanKey.length < 4) {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Nhập mã cá nhân tối thiểu 4 ký tự để tải tiến độ.' : 'Enter a valid Sync ID (min 4 chars).',
      });
      return;
    }
    setCloudLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch(`/api/progress?key=${encodeURIComponent(cleanKey)}`);
      const json = (await res.json()) as {
        success: boolean;
        error?: string;
        data?: { payload: SyncPayload };
      };
      if (res.ok && json.success && json.data?.payload) {
        applySyncPayload(json.data.payload, 'MERGE');
        setSyncPasskey(cleanKey);
        setStatusMsg({
          type: 'ok',
          text: isVi
            ? `Đã tải & hợp nhất tiến độ từ mã "${cleanKey}"!`
            : `Pulled and merged progress from "${cleanKey}"!`,
        });
      } else if (res.status === 404) {
        setStatusMsg({
          type: 'err',
          text: isVi ? `Chưa có dữ liệu nào lưu dưới mã "${cleanKey}".` : `No snapshot found for "${cleanKey}".`,
        });
      } else {
        setStatusMsg({
          type: 'err',
          text: isVi
            ? 'Server hiện chưa kết nối PostgreSQL Cloud. Bạn hãy dùng tab "Link & Mã nhanh" để đồng bộ trực tiếp!'
            : 'Cloud database not configured. Use the Quick Link/Code tab instead!',
        });
      }
    } catch {
      setStatusMsg({
        type: 'err',
        text: isVi ? 'Lỗi kết nối tới máy chủ đồng bộ.' : 'Network error while pulling progress.',
      });
    } finally {
      setCloudLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={closeModal}
    >
      <div
        className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-t-lg sm:rounded-lg p-4 sm:p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-foreground">
                {isVi ? 'Đồng bộ Tiến độ Điện thoại ↔ Máy tính' : 'Cross-Device Progress Sync'}
              </h2>
              <span className="text-[11px] text-secondary">
                {isVi
                  ? `Hiện tại: ${completedChapters.length}/14 chương • ${masteredTerms.length} thuật ngữ • ${examHistory.length} lần thi`
                  : `Current: ${completedChapters.length}/14 chapters • ${masteredTerms.length} terms • ${examHistory.length} exams`}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1.5 rounded-md text-secondary hover:text-foreground hover:bg-surface-high transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div
            className={`p-2.5 rounded-md border text-xs leading-relaxed ${
              statusMsg.type === 'ok'
                ? 'bg-positive/10 border-positive/30 text-positive'
                : 'bg-error/10 border-error/30 text-error'
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Incoming Sync Preview Card (from ?sync= link or pasted code) */}
        {pendingPayload && (
          <div className="p-3.5 rounded-md bg-sidebar border border-primary/40 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-primary">
                {isVi ? 'Dữ liệu đồng bộ sẵn sàng nhập:' : 'Incoming Sync Data Ready:'}
              </span>
              <span className="font-mono text-[11px] text-secondary">
                {new Date(pendingPayload.exportedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center bg-card border border-border rounded-md p-2 text-xs">
              <div>
                <div className="font-mono font-bold text-foreground">
                  {pendingPayload.completedChapters.length}/14
                </div>
                <div className="text-[10px] text-secondary">{isVi ? 'Chương' : 'Chapters'}</div>
              </div>
              <div>
                <div className="font-mono font-bold text-foreground">
                  {pendingPayload.masteredTerms.length}
                </div>
                <div className="text-[10px] text-secondary">Flashcards</div>
              </div>
              <div>
                <div className="font-mono font-bold text-positive">
                  {pendingPayload.bestExamPct !== null ? `${pendingPayload.bestExamPct}%` : '—'}
                </div>
                <div className="text-[10px] text-secondary">
                  {pendingPayload.examHistory.length} {isVi ? 'lần thi' : 'exams'}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyPending('MERGE')}
                className="flex-1 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                {isVi ? 'Hợp nhất thông minh (Khuyên dùng)' : 'Smart Merge (Recommended)'}
              </button>
              <button
                type="button"
                onClick={() => handleApplyPending('REPLACE')}
                className="px-3 py-2 rounded-md border border-border bg-card text-secondary hover:text-foreground text-xs font-medium transition-colors"
              >
                {isVi ? 'Ghi đè máy này' : 'Replace Local'}
              </button>
            </div>
          </div>
        )}

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-md bg-sidebar border border-border text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('QUICK')}
            className={`py-1.5 px-2.5 rounded font-medium transition-colors ${
              activeTab === 'QUICK'
                ? 'bg-card text-foreground border border-border'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {isVi ? '1. Link & Mã nhanh' : '1. Quick Link & Code'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('BACKUP')}
            className={`py-1.5 px-2.5 rounded font-medium transition-colors ${
              activeTab === 'BACKUP'
                ? 'bg-card text-foreground border border-border'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {isVi ? '2. File JSON & Cloud' : '2. JSON File & Cloud'}
          </button>
        </div>

        {activeTab === 'QUICK' ? (
          <div className="flex flex-col gap-3.5">
            {/* Send to another device */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-foreground">
                {isVi ? 'Bước A · Gửi tiến độ từ máy này sang thiết bị khác' : 'Step A · Send progress from this device'}
              </span>
              <p className="text-[11px] text-secondary leading-relaxed">
                {isVi
                  ? 'Bấm Sao chép Link rồi gửi qua Zalo, Messenger, iMessage hoặc AirDrop sang điện thoại/máy tính. Mở link đó là tiến độ tự động gộp vào nhau!'
                  : 'Copy the sync link and send it to your phone or computer. Opening the link automatically merges your progress!'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  {copiedType === 'LINK' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isVi ? 'Sao chép Link Đồng bộ' : 'Copy Sync Link'}</span>
                </button>

                {canNativeShare && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card text-foreground hover:bg-surface-high text-xs font-medium transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                    <span>{isVi ? 'Chia sẻ' : 'Share'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card text-secondary hover:text-foreground text-xs font-medium transition-colors"
                >
                  {copiedType === 'CODE' ? <Check className="w-3.5 h-3.5 text-positive" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isVi ? 'Copy Mã' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            {/* Receive from another device */}
            <div className="flex flex-col gap-2 pt-3 border-t border-border">
              <span className="text-xs font-semibold text-foreground">
                {isVi ? 'Bước B · Nhận tiến độ từ thiết bị khác' : 'Step B · Import from another device'}
              </span>
              <textarea
                rows={2}
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                placeholder={
                  isVi
                    ? 'Dán Link đồng bộ hoặc Mã (dep1_...) từ thiết bị kia vào đây...'
                    : 'Paste Sync Link or Code (dep1_...) here...'
                }
                className="w-full rounded-md bg-sidebar border border-border px-3 py-2 text-xs font-mono text-foreground placeholder:text-secondary focus:outline-none focus:border-primary"
              />
              {pasteInput.trim() && !pendingPayload && (
                <span className="text-[11px] text-error">
                  {isVi ? 'Mã/Link chưa đúng định dạng.' : 'Invalid sync token or link.'}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {/* JSON File Backup */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-foreground">
                {isVi ? 'Sao lưu & Khôi phục bằng File (.json)' : 'Backup & Restore via File (.json)'}
              </span>
              <p className="text-[11px] text-secondary leading-relaxed">
                {isVi
                  ? 'Phù hợp khi bạn viết nhiều ghi chú dài ở các chương và muốn lưu trữ toàn bộ ra file riêng.'
                  : 'Ideal when you have extensive chapter notes and want a full offline backup file.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleExportJsonFile}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card hover:bg-surface-high text-foreground text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-primary" />
                  <span>{isVi ? 'Tải file .json' : 'Export .json'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card hover:bg-surface-high text-foreground text-xs font-medium transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-primary" />
                  <span>{isVi ? 'Nhập file .json' : 'Import .json'}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImportJsonFile}
                  className="hidden"
                />
              </div>
            </div>

            {/* Cloud Sync via Passkey */}
            <div className="flex flex-col gap-2 pt-3 border-t border-border">
              <span className="text-xs font-semibold text-foreground">
                {isVi ? 'Đồng bộ Cloud qua Mã cá nhân (Khi bật PostgreSQL)' : 'Cloud Sync via Personal ID (PostgreSQL)'}
              </span>
              <input
                type="text"
                value={syncPasskey}
                onChange={(e) => setSyncPasskey(e.target.value)}
                placeholder={isVi ? 'Đặt mã riêng (VD: khai-dep110-2026)' : 'Enter personal Sync ID (e.g. khai-dep110)'}
                className="w-full rounded-md bg-sidebar border border-border px-3 py-2 text-xs font-mono text-foreground placeholder:text-secondary focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={cloudLoading}
                  onClick={handleCloudPush}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50 transition-opacity"
                >
                  <CloudUpload className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Đẩy lên Cloud' : 'Push to Cloud'}</span>
                </button>
                <button
                  type="button"
                  disabled={cloudLoading}
                  onClick={handleCloudPull}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-card hover:bg-surface-high text-foreground text-xs font-medium disabled:opacity-50 transition-colors"
                >
                  <CloudDownload className="w-3.5 h-3.5 text-primary" />
                  <span>{isVi ? 'Tải về & Hợp nhất' : 'Pull & Merge'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-secondary">
          <span className="inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            {lastSyncedAt
              ? isVi
                ? `Đồng bộ gần nhất: ${new Date(lastSyncedAt).toLocaleString()}`
                : `Last synced: ${new Date(lastSyncedAt).toLocaleString()}`
              : isVi
                ? 'Chưa đồng bộ lần nào trên thiết bị này'
                : 'Not synced yet on this device'}
          </span>
          <span className="font-mono">{bestExamPct !== null ? `Best: ${bestExamPct}%` : 'DEP110'}</span>
        </div>
      </div>
    </div>
  );
};
