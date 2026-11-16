'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { ArchitectureVisualizer } from '@/components/visualizer/ArchitectureVisualizer';
import { useAppStore } from '@/store/useAppStore';

export default function VisualizerPage() {
  const { language } = useAppStore();
  const isVi = language === 'vi';

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow="Interactive Architecture Visualizer"
        title={isVi ? 'Sơ Đồ Kiến Trúc Triển Khai Apple' : 'Apple Deployment Architecture Visualizer'}
        subtitle={
          isVi
            ? 'Khám phá trực quan các luồng giao thức cốt lõi: APNs (Port 5223), ADE Zero-touch, Declarative Device Management (DDM) và phân phối ứng dụng VPP.'
            : 'Interactive step-by-step visualizer for APNs, Automated Device Enrollment, DDM state autonomy, and Volume Purchasing.'
        }
      />
      <ArchitectureVisualizer />
    </div>
  );
}
