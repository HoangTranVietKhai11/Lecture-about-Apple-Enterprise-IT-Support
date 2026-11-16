'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { WebTerminal } from '@/components/terminal/WebTerminal';
import { useAppStore } from '@/store/useAppStore';

export default function TerminalLabPage() {
  const { language } = useAppStore();
  const isVi = language === 'vi';

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow="Hands-on CLI & Troubleshooting"
        title={isVi ? 'macOS Enterprise Terminal & Khắc Phục Sự Cố' : 'macOS MDM Terminal & Enterprise Troubleshooting'}
        subtitle={
          isVi
            ? 'Thực hành các câu lệnh chẩn đoán chuyên sâu (profiles, fdesetup, AssetCacheManagerUtil, jamf) và xử lý 6 kịch bản sự cố doanh nghiệp thực tế.'
            : 'Interactive macOS CLI simulation for MDM diagnostic commands and real-world enterprise troubleshooting tickets.'
        }
      />
      <WebTerminal />
    </div>
  );
}
