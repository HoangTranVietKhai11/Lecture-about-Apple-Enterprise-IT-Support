'use client';

import React, { useState } from 'react';
import { FLOWCHARTS } from '@/data/flowcharts';
import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeFlowKey, setActiveFlowKey] = useState<string>('apns');
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(0);
  const [faultMode, setFaultMode] = useState<boolean>(false);
  const { language } = useAppStore();
  const isVi = language === 'vi';

  const flow = FLOWCHARTS[activeFlowKey] || FLOWCHARTS['apns'];
  const nodes = flow.nodes;
  const activeNode = nodes[activeNodeIdx] || nodes[0];

  const handleSelectFlow = (key: string) => {
    setActiveFlowKey(key);
    setActiveNodeIdx(0);
    setFaultMode(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Flow Selection Tabs */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => handleSelectFlow('apns')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeFlowKey === 'apns'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? '1. Luồng APNs Port 5223' : '1. APNs Port 5223 Flow'}
        </button>

        <button
          type="button"
          onClick={() => handleSelectFlow('ade')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeFlowKey === 'ade'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? '2. Luồng ADE Zero-Touch' : '2. ADE Zero-Touch Flow'}
        </button>

        <button
          type="button"
          onClick={() => handleSelectFlow('ddm')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeFlowKey === 'ddm'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? '3. Kiến trúc DDM Tự chủ' : '3. DDM Architecture'}
        </button>

        <button
          type="button"
          onClick={() => handleSelectFlow('vpp')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeFlowKey === 'vpp'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? '4. Phân phối VPP & Caching' : '4. VPP & Caching'}
        </button>
      </div>

      {/* Flow Workspace */}
      <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-semibold text-foreground">
              {flow.title}
            </h3>
            <p className="text-xs text-secondary max-w-2xl leading-relaxed">
              {flow.desc}
            </p>
          </div>

          {flow.hasFaultToggle && (
            <button
              type="button"
              onClick={() => setFaultMode(!faultMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                faultMode
                  ? 'bg-error text-white border-error'
                  : 'bg-card text-error border-error/40 hover:bg-error/10'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {faultMode
                  ? isVi ? 'Đang chặn TCP 5223 (Bấm để mở lại)' : 'Port 5223 Blocked (Click to restore)'
                  : flow.faultLabel || 'Mô phỏng lỗi tường lửa'}
              </span>
            </button>
          )}
        </div>

        {/* Step Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {nodes.map((n, idx) => {
            const isSelected = idx === activeNodeIdx;
            const isFaulted = faultMode && idx >= 2;

            let cardStyle = 'border-border bg-card hover:border-primary/50';
            if (isFaulted) {
              cardStyle = 'border-error/40 bg-error/10 text-error';
            } else if (isSelected) {
              cardStyle = 'border-primary/60 bg-primary/10 text-primary ring-1 ring-primary';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNodeIdx(idx)}
                className={`p-3 rounded-md border text-left flex flex-col gap-1.5 transition-colors ${cardStyle}`}
              >
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="font-semibold">{n.tag}</span>
                  <span className="text-secondary text-[10px]">
                    {n.port}
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-foreground leading-snug">
                  {n.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation for Active Node */}
        <div className="p-3.5 rounded-md border border-border bg-card flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-semibold text-[11px]">
                {activeNode.tag}
              </span>
              <strong className="text-xs font-semibold text-foreground">
                {activeNode.title}
              </strong>
            </div>
            <span className="text-[11px] font-mono text-secondary">
              Giao thức: {activeNode.port}
            </span>
          </div>

          <p className="text-xs text-secondary leading-relaxed">
            {faultMode && activeNode.fault ? (
              <span className="text-error font-medium flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{activeNode.fault}</span>
              </span>
            ) : (
              activeNode.normal
            )}
          </p>

          {/* Step Navigation Controls */}
          <div className="flex justify-between items-center pt-2 border-t border-border mt-1">
            <button
              type="button"
              disabled={activeNodeIdx === 0}
              onClick={() => setActiveNodeIdx((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>{isVi ? 'Bước trước' : 'Previous'}</span>
            </button>

            <span className="text-xs font-mono text-secondary">
              {activeNodeIdx + 1} / {nodes.length}
            </span>

            <button
              type="button"
              disabled={activeNodeIdx === nodes.length - 1}
              onClick={() => setActiveNodeIdx((prev) => Math.min(nodes.length - 1, prev + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>{isVi ? 'Bước tiếp theo' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
