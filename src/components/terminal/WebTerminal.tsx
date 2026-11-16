'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CLI_MISSIONS, LAB_SCENARIOS } from '@/data/terminal-labs';
import { useAppStore } from '@/store/useAppStore';
import { Terminal as TerminalIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface TerminalLine {
  text: string;
  type?: 'cmd' | 'ok' | 'err' | 'warn' | 'info';
}

export const WebTerminal: React.FC = () => {
  const { completedMissions, completeMission, solvedLabs, markLabSolved, language } = useAppStore();
  const isVi = language === 'vi';

  const [inputVal, setInputVal] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'terminal' | 'tickets'>('terminal');
  const [selectedLabId, setSelectedLabId] = useState<string>(LAB_SCENARIOS[0].id);
  const [labAnswers, setLabAnswers] = useState<Record<string, { cause?: number; fix?: number; verified?: boolean }>>({});

  const [lines, setLines] = useState<TerminalLine[]>([
    { text: `Last login: ${new Date().toLocaleDateString()} on ttys001`, type: 'info' },
    { text: `DEP110 Enterprise macOS Shell — Gõ 'help' để xem danh sách lệnh MDM hỗ trợ.`, type: 'ok' },
  ]);

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [...lines, { text: `admin@MacBookPro-Enterprise ~ % ${trimmed}`, type: 'cmd' }];
    const lc = trimmed.toLowerCase();

    if (lc === 'clear') {
      setLines([]);
      return;
    } else if (lc === 'help') {
      newLines.push({
        text: [
          `Các lệnh quản trị Apple Deployment khả dụng:`,
          `  profiles status -type enrollment      Kiểm tra ADE & User-Approved MDM`,
          `  profiles list                         Liệt kê Configuration Profiles đã cài`,
          `  nc -vz gateway.push.apple.com 5223    Kiểm tra kết nối APNs Port 5223`,
          `  app-sso platform -s                   Xem trạng thái Platform SSO & Shared Keys`,
          `  fdesetup status                       Kiểm tra mã hóa đĩa FileVault`,
          `  AssetCacheManagerUtil status          Xem thông số Content Caching cục bộ`,
          `  sudo jamf policy                      Kéo và thực thi các policy của Jamf agent`,
          `  cat /var/log/jamf.log                 Xem nhật ký thực thi của Jamf Pro`,
          `  sysdiagnose                           Thu thập toàn bộ archive log hệ thống`,
          `  clear                                 Xóa màn hình Terminal`,
        ].join('\n'),
        type: 'info',
      });
    } else if (lc.includes('profile status') || lc.includes('profiles status')) {
      completeMission('m1');
      newLines.push({
        text: `Enrolled via DEP: Yes\nMDM enrollment: Yes (User Approved)\nSupervised: Yes (Enforced via Apple Business)`,
        type: 'ok',
      });
    } else if (lc.includes('profile list') || lc.includes('profiles list')) {
      newLines.push({
        text: `_computerlevel[1] attribute: profileIdentifier: com.apple.mdm.wifi (Enterprise 802.1X)\n_computerlevel[2] attribute: profileIdentifier: com.apple.mdm.passcode (Compliance Policy)\n_computerlevel[3] attribute: profileIdentifier: com.apple.PlatformSSO (Entra ID Password Sync)\n_computerlevel[4] attribute: profileIdentifier: com.apple.security.FDERecoveryKeyEscrow (FileVault PRK)`,
        type: 'ok',
      });
    } else if (lc.includes('5223') || lc.includes('gateway.push.apple.com')) {
      completeMission('m2');
      newLines.push({
        text: `Connection to gateway.push.apple.com (17.57.144.20) 5223 port [tcp/*] succeeded!`,
        type: 'ok',
      });
    } else if (lc.includes('app-sso')) {
      completeMission('m3');
      newLines.push({
        text: `Platform SSO Configuration:\n  Extension: com.microsoft.CompanyPortalMac.ssoextension\n  AuthenticationMethod: Password (Synced with FileVault)\n  SharedDeviceKeys: Enabled (Device Registered)\n  PrimaryRefreshToken (PRT): Valid (Hardware-bound Secure Enclave)\n  TouchIDUnlock: Allowed`,
        type: 'ok',
      });
    } else if (lc.includes('fdesetup')) {
      completeMission('m4');
      newLines.push({
        text: `FileVault is On.\nRecovery Key Type: Personal Recovery Key (Escrowed to MDM Server)\nSecure Token Users: admin, devuser`,
        type: 'ok',
      });
    } else if (lc.includes('assetcachemanagerutil')) {
      completeMission('m5');
      newLines.push({
        text: `AssetCacheManagerUtil status:\n  Activated: true\n  CacheStatus: OK\n  BytesFromCacheToClients: 48.6 GB (91.4% Bandwidth Saved)\n  PublicAddress: 203.113.45.10\n  Note: Per-client asset breakdown hidden for privacy.`,
        type: 'ok',
      });
    } else if (lc.includes('jamf recon')) {
      newLines.push({
        text: `Retrieving inventory preferences from https://mdm.company.com:8443...\nLocating Hardware Information...\nLocating Operating System Information...\nGathering Applications...\nSubmitting data to https://mdm.company.com:8443... Complete.`,
        type: 'ok',
      });
    } else if (lc.includes('jamf policy')) {
      newLines.push({
        text: `Checking for policies triggered by "recurring check-in"...\nExecuting Policy Update Inventory...\nSubmitting data to https://mdm.company.com:8443...`,
        type: 'ok',
      });
    } else if (lc.includes('jamf.log')) {
      newLines.push({
        text: `[jamf.log] 2026-11-16 10:14:02 MacBookPro-Enterprise jamf[412]: Policy 'Install Office Suite' completed successfully.`,
        type: 'info',
      });
    } else if (lc.includes('sw_vers')) {
      newLines.push({
        text: `ProductName:            macOS\nProductVersion:         15.1\nBuildVersion:           24B83`,
        type: 'info',
      });
    } else if (lc.includes('csrutil')) {
      newLines.push({
        text: `System Integrity Protection status: enabled.`,
        type: 'ok',
      });
    } else if (lc === 'whoami') {
      newLines.push({
        text: `admin`,
        type: 'ok',
      });
    } else if (lc === 'pwd') {
      newLines.push({
        text: `/Users/admin`,
        type: 'ok',
      });
    } else if (lc.startsWith('ls')) {
      newLines.push({
        text: `Applications  Desktop  Documents  Downloads  Library  Movies  Music  Pictures`,
        type: 'ok',
      });
    } else if (lc.startsWith('uname')) {
      newLines.push({
        text: `Darwin MacBookPro-Enterprise.local 24.1.0 Darwin Kernel Version 24.1.0 root:xnu-11215.41.3~2/RELEASE_ARM64_T6030 arm64`,
        type: 'ok',
      });
    } else if (lc.startsWith('free') || lc.startsWith('vm_stat')) {
      newLines.push({
        text: `Mach Virtual Memory Statistics: (page size of 16384 bytes)\nPages free: 1428590. Pages active: 930124. Pages inactive: 412903. Pages wired down: 320140.\n[Unified Memory: 36.0 GB Total | 14.8 GB In Use | 21.2 GB Available]`,
        type: 'info',
      });
    } else if (lc.startsWith('df')) {
      newLines.push({
        text: `Filesystem    Size   Used  Avail Capacity iused      ifree %iused  Mounted on\n/dev/disk3s5  994G   182G   780G    19% 1248032 8179243920    0%   /System/Volumes/Data`,
        type: 'info',
      });
    } else if (lc.includes('sysdiagnose')) {
      newLines.push({
        text: `sysdiagnose started...\nCompressing logs to /var/tmp/sysdiagnose_2026.11.16.tar.gz ... Complete.`,
        type: 'warn',
      });
    } else {
      newLines.push({
        text: `zsh: command not found: ${trimmed}. Gõ 'help' để xem danh sách lệnh được hỗ trợ.`,
        type: 'err',
      });
    }

    setLines(newLines);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  // Ticket Scenarios Logic
  const activeLab = LAB_SCENARIOS.find((l) => l.id === selectedLabId) || LAB_SCENARIOS[0];
  const curLabState = labAnswers[activeLab.id] || {};
  const isLabSolved = solvedLabs.includes(activeLab.id);

  const handleVerifyLab = () => {
    if (curLabState.cause === activeLab.correctCause && curLabState.fix === activeLab.correctFix) {
      markLabSolved(activeLab.id);
    }
    setLabAnswers({
      ...labAnswers,
      [activeLab.id]: { ...curLabState, verified: true },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Subtab selection */}
      <div className="flex gap-1.5 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('terminal')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'terminal' ? 'bg-primary/10 text-primary font-semibold' : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? '1. Giả lập macOS Terminal Shell' : '1. Web Terminal Emulator'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tickets')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === 'tickets' ? 'bg-primary/10 text-primary font-semibold' : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? '2. Xử lý Sự cố IT Doanh nghiệp (6 Tickets)' : '2. Troubleshooting Scenarios'}
        </button>
      </div>

      {activeTab === 'terminal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Terminal Window */}
          <div className="lg:col-span-2 bg-[#121212] border border-[#2a2a2a] rounded-lg overflow-hidden flex flex-col font-mono">
            {/* Window Bar */}
            <div className="bg-[#181818] px-3.5 py-2 border-b border-[#2a2a2a] flex justify-between items-center text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                <span className="ml-2 font-medium text-gray-300 text-[11px]">admin@MacBookPro-Enterprise — zsh</span>
              </div>
              <span className="text-[10px] text-gray-500">macOS • ADE Managed</span>
            </div>

            {/* Terminal Body */}
            <div ref={outputRef} className="p-3.5 h-[360px] overflow-y-auto text-xs leading-relaxed flex flex-col gap-1">
              {lines.map((l, idx) => {
                let colorClass = 'text-gray-300';
                if (l.type === 'cmd') colorClass = 'text-primary font-semibold';
                if (l.type === 'ok') colorClass = 'text-positive';
                if (l.type === 'err') colorClass = 'text-error';
                if (l.type === 'warn') colorClass = 'text-warning';
                return (
                  <div key={idx} className={`whitespace-pre-wrap ${colorClass}`}>
                    {l.text}
                  </div>
                );
              })}
            </div>

            {/* Input Row */}
            <form onSubmit={handleFormSubmit} className="flex border-t border-[#2a2a2a] bg-[#161616] p-1.5 gap-2">
              <span className="text-primary font-bold pl-2 pt-1.5 text-xs">%</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Nhập lệnh (ví dụ: profiles status -type enrollment)"
                className="flex-1 bg-transparent border-0 text-xs text-white focus:outline-none font-mono py-1.5"
                spellCheck={false}
              />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                {isVi ? 'Chạy' : 'Run'}
              </button>
            </form>
          </div>

          {/* Missions Side Panel */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {isVi ? '5 Nhiệm vụ Thực hành CLI' : '5 CLI Diagnostic Missions'}
            </h4>

            <div className="flex flex-col gap-2">
              {CLI_MISSIONS.map((m) => {
                const isDone = completedMissions.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-lg border text-xs flex flex-col gap-1.5 bg-card ${
                      isDone ? 'border-l-4 border-l-positive' : 'border-border'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <strong className="font-semibold text-foreground text-[12px]">{m.title}</strong>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-positive" />}
                    </div>
                    <p className="text-secondary text-[11px] leading-relaxed">
                      {m.desc}
                    </p>
                    <button
                      type="button"
                      onClick={() => runCommand(m.hint)}
                      className="px-2 py-0.5 rounded bg-sidebar border border-border text-primary font-mono text-[11px] text-left hover:border-primary transition-colors"
                    >
                      % {m.hint}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Ticket List */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
              {isVi ? 'Danh sách sự cố' : 'Troubleshooting Tickets'}
            </span>
            {LAB_SCENARIOS.map((lab) => {
              const isSolved = solvedLabs.includes(lab.id);
              const isSelected = lab.id === activeLab.id;

              return (
                <button
                  key={lab.id}
                  type="button"
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`p-3 rounded-lg border text-left text-xs flex flex-col gap-1 transition-colors bg-card ${
                    isSelected
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-secondary">
                      {lab.code}
                    </span>
                    {isSolved && (
                      <span className="text-[10px] text-positive font-semibold">Đã xong ✓</span>
                    )}
                  </div>
                  <strong className="text-foreground text-[12px] leading-snug">{lab.title}</strong>
                </button>
              );
            })}
          </div>

          {/* Ticket Detail Workspace */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-sidebar border border-border text-secondary">
                  {activeLab.code}
                </span>
                <strong className="text-sm font-semibold text-foreground">
                  {activeLab.title}
                </strong>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sidebar text-secondary">
                {activeLab.severity}
              </span>
            </div>

            {/* Symptom & Log Box */}
            <div className="flex flex-col gap-2">
              <div className="text-xs">
                <strong className="text-foreground">Hiện tượng: </strong>
                <span className="text-secondary">{activeLab.symptom}</span>
              </div>
              <div className="p-3 rounded-md bg-[#121212] border border-[#2a2a2a] text-xs font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                {activeLab.logs}
              </div>
            </div>

            {/* Step 1: Root Cause Diagnosis */}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <strong className="text-xs font-semibold text-foreground">
                Bước 1: Xác định nguyên nhân gốc rễ (Root Cause)
              </strong>
              <div className="flex flex-col gap-1.5">
                {activeLab.causes.map((c, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-2.5 p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                      curLabState.cause === idx
                        ? 'border-primary/50 bg-primary/10 text-foreground'
                        : 'border-border hover:bg-surface-high text-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`cause_${activeLab.id}`}
                      checked={curLabState.cause === idx}
                      onChange={() =>
                        setLabAnswers({
                          ...labAnswers,
                          [activeLab.id]: { ...curLabState, cause: idx, verified: false },
                        })
                      }
                      className="mt-0.5"
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Remediation Fix */}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <strong className="text-xs font-semibold text-foreground">
                Bước 2: Giải pháp xử lý (Remediation Plan)
              </strong>
              <div className="flex flex-col gap-1.5">
                {activeLab.fixes.map((f, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-2.5 p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                      curLabState.fix === idx
                        ? 'border-primary/50 bg-primary/10 text-foreground'
                        : 'border-border hover:bg-surface-high text-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`fix_${activeLab.id}`}
                      checked={curLabState.fix === idx}
                      onChange={() =>
                        setLabAnswers({
                          ...labAnswers,
                          [activeLab.id]: { ...curLabState, fix: idx, verified: false },
                        })
                      }
                      className="mt-0.5"
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verification Result Box */}
            {curLabState.verified && (
              <div
                className={`p-3 rounded-md border text-xs flex flex-col gap-1 ${
                  curLabState.cause === activeLab.correctCause && curLabState.fix === activeLab.correctFix
                    ? 'border-l-4 border-l-positive bg-card border-border'
                    : 'border-l-4 border-l-error bg-card border-border'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  {curLabState.cause === activeLab.correctCause && curLabState.fix === activeLab.correctFix ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-positive" />
                      <span className="text-positive">Chẩn đoán và xử lý chính xác!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-error" />
                      <span className="text-error">Chưa chính xác — Vui lòng xem lại logs</span>
                    </>
                  )}
                </div>
                <p className="text-secondary pl-5 leading-relaxed">{activeLab.explain}</p>
              </div>
            )}

            <button
              type="button"
              disabled={typeof curLabState.cause !== 'number' || typeof curLabState.fix !== 'number'}
              onClick={handleVerifyLab}
              className="mt-1 px-4 py-2 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-fit"
            >
              Xác nhận & Kiểm tra giải pháp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
