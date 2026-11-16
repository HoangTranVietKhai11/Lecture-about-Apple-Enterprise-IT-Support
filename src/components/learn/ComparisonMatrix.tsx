'use client';

import React, { useState } from 'react';
import { COMPARISON_MATRICES } from '@/data/matrices';
import { useAppStore } from '@/store/useAppStore';

export const ComparisonMatrix: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('enroll');
  const { language } = useAppStore();
  const isVi = language === 'vi';

  const currentMatrix = COMPARISON_MATRICES[activeKey] || COMPARISON_MATRICES['enroll'];

  return (
    <div className="flex flex-col gap-4 bg-card border border-border rounded-lg p-4">
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveKey('enroll')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeKey === 'enroll'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? 'User vs Device vs ADE Enrollment' : 'Enrollment Comparison'}
        </button>

        <button
          type="button"
          onClick={() => setActiveKey('jamf')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeKey === 'jamf'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? 'Jamf Policy vs Configuration Profile' : 'Jamf Policy vs Profile'}
        </button>

        <button
          type="button"
          onClick={() => setActiveKey('psso')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeKey === 'psso'
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-secondary hover:text-foreground hover:bg-surface-high'
          }`}
        >
          {isVi ? 'Phương thức Xác thực Platform SSO' : 'Platform SSO Auth Methods'}
        </button>
      </div>

      <h3 className="text-sm font-semibold text-foreground">
        {currentMatrix.title}
      </h3>

      <div className="overflow-x-auto border border-border rounded-md bg-card">
        <table className="w-full text-xs border-collapse min-w-[620px]">
          <thead>
            <tr className="bg-sidebar border-b border-border text-foreground font-semibold text-[11px] uppercase tracking-wider">
              {currentMatrix.headers.map((h, i) => (
                <th key={i} className="text-left py-2.5 px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentMatrix.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="border-b border-border hover:bg-surface-high/50 transition-colors"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-2.5 px-3 align-top leading-relaxed ${
                      cIdx === 0 ? 'font-medium text-foreground w-1/4' : 'text-secondary'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
