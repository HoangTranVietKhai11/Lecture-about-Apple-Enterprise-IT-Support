'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { Header } from '@/components/layout/Header';
import { CHAPTERS } from '@/data/chapters';
import { EXAM_BANK } from '@/data/exam-bank';
import {
  BookOpen,
  GraduationCap,
  Network,
  Terminal,
  ArrowRight,
} from 'lucide-react';

export default function DashboardPage() {
  const { language, completedChapters, bestExamPct, examHistory } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isVi = language === 'vi';
  const completedCount = mounted ? completedChapters.length : 0;
  const bestScore = mounted ? bestExamPct : null;
  const historyList = mounted ? examHistory || [] : [];

  return (
    <div className="flex flex-col gap-6">
      <Header
        eyebrow="Apple Certified IT Professional — DEP110"
        title={isVi ? 'Tổng quan Lộ trình Đào tạo DEP110' : 'DEP110 Training Platform Overview'}
        subtitle={
          isVi
            ? 'Tài liệu chuẩn hóa kiến thức Apple Platform Deployment & Management: 14 chương lý thuyết, sơ đồ kỹ thuật APNs/ADE/DDM, Terminal chẩn đoán và phòng thi thử 60 câu Pearson VUE.'
            : 'Structured Apple Platform Deployment & Management roadmap: 14 chapters, interactive architecture flows, macOS terminal labs, and Pearson VUE 60-question simulator.'
        }
      />

      {/* 5.3 Thẻ thống kê: Minimalist, card nền trắng, viền xám mảnh, số liệu gọn gàng */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-card border border-border p-3.5 rounded-lg flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {isVi ? 'Tiến độ học tập' : 'Study Progress'}
          </span>
          <span className="text-xl font-bold font-mono text-foreground">
            {completedCount} / {CHAPTERS.length}
          </span>
          <span className="text-[12px] text-secondary">
            {Math.round((completedCount / CHAPTERS.length) * 100)}% {isVi ? 'hoàn thành' : 'completed'}
          </span>
        </div>

        <div className="bg-card border border-border p-3.5 rounded-lg flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {isVi ? 'Ngân hàng đề thi' : 'Question Bank'}
          </span>
          <span className="text-xl font-bold font-mono text-foreground">
            {EXAM_BANK.length} {isVi ? 'câu' : 'questions'}
          </span>
          <span className="text-[12px] text-secondary">
            {isVi ? 'Song ngữ Việt — Anh' : 'Bilingual VN — EN'}
          </span>
        </div>

        <div className="bg-card border border-border p-3.5 rounded-lg flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {isVi ? 'Điểm thi cao nhất' : 'Highest Exam Score'}
          </span>
          <span className="text-xl font-bold font-mono text-positive">
            {bestScore !== null ? `${bestScore}%` : '—'}
          </span>
          <span className="text-[12px] text-secondary">
            {historyList.length > 0
              ? `${historyList.length} ${isVi ? 'lần thi' : 'attempts'} • ${isVi ? 'Gần nhất' : 'Latest'}: ${historyList[0].percentage}%`
              : isVi ? 'Chuẩn đỗ: ≥ 75%' : 'Passing score: ≥ 75%'}
          </span>
        </div>

        <div className="bg-card border border-border p-3.5 rounded-lg flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {isVi ? 'Thời lượng lộ trình' : 'Total Course Duration'}
          </span>
          <span className="text-xl font-bold font-mono text-foreground">
            17h 20m
          </span>
          <span className="text-[12px] text-secondary">
            {isVi ? '14 chương lý thuyết' : '14 official chapters'}
          </span>
        </div>
      </div>

      {/* 5.4 Thẻ mô-đun: Kích thước và khoảng cách đồng nhất, hover nhẹ, icon nhỏ đơn sắc */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module 1: Learning Hub */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-3.5 hover:border-primary/50 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-secondary">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {isVi ? 'Mô đun 1 · Học tập' : 'Module 1 · Learning Hub'}
              </span>
            </div>
            <h3 className="text-[16px] font-semibold text-foreground">
              {isVi ? 'Lý thuyết 14 Chương & Ma trận So sánh' : '14 Chapters & Comparison Matrices'}
            </h3>
            <p className="text-[13px] text-secondary leading-relaxed">
              {isVi
                ? 'Hệ thống hóa kiến thức toàn diện từ APNs, Automated Device Enrollment, DDM đến Platform SSO và bảo mật FileVault.'
                : 'Complete coverage of APNs, ADE, DDM, Platform SSO, FileVault, and Volume Purchasing.'}
            </p>
          </div>
          <Link
            href="/learn/1"
            className="pt-2.5 border-t border-border inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
          >
            <span>{isVi ? 'Bắt đầu học từ Chương 1' : 'Start Chapter 1'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Module 2: Exam Simulator */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-3.5 hover:border-primary/50 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-secondary">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {isVi ? 'Mô đun 2 · Phòng thi' : 'Module 2 · Exam Simulator'}
              </span>
            </div>
            <h3 className="text-[16px] font-semibold text-foreground">
              {isVi ? 'Mô phỏng Thi thử Pearson VUE 60Q / 60M' : 'Pearson VUE Simulator (60Q / 60M)'}
            </h3>
            <p className="text-[13px] text-secondary leading-relaxed">
              {isVi
                ? 'Đồng hồ đếm ngược, bảng điều hướng 60 câu, gắn cờ xem lại, chấm điểm tức thì và phân tích năng lực theo từng mảng kiến thức.'
                : 'Countdown timer, 60-question navigator, review flag, instant score, and domain diagnostic breakdown.'}
            </p>
          </div>
          <Link
            href="/exam"
            className="pt-2.5 border-t border-border inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
          >
            <span>{isVi ? 'Vào phòng thi thử' : 'Enter Exam Simulator'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Module 3: Visualizer */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-3.5 hover:border-primary/50 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-secondary">
              <Network className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {isVi ? 'Mô đun 3 · Kiến trúc' : 'Module 3 · Architecture Visualizer'}
              </span>
            </div>
            <h3 className="text-[16px] font-semibold text-foreground">
              {isVi ? 'Sơ đồ luồng tương tác & Mô phỏng sự cố' : 'Interactive Flow Diagrams & Fault Testing'}
            </h3>
            <p className="text-[13px] text-secondary leading-relaxed">
              {isVi
                ? 'Khám phá từng bước luồng APNs TCP 5223, ADE Zero-Touch, kiến trúc DDM 4 Declarations và cơ chế mô phỏng lỗi Firewall.'
                : 'Explore step-by-step APNs TCP 5223 push flow, ADE zero-touch, DDM architecture, and firewall drop simulations.'}
            </p>
          </div>
          <Link
            href="/visualizer"
            className="pt-2.5 border-t border-border inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
          >
            <span>{isVi ? 'Mở sơ đồ kiến trúc' : 'Open Visualizer'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Module 4: Terminal Diagnostics */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between gap-3.5 hover:border-primary/50 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-secondary">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                {isVi ? 'Mô đun 4 · Thực hành CLI' : 'Module 4 · Web Terminal Labs'}
              </span>
            </div>
            <h3 className="text-[16px] font-semibold text-foreground">
              {isVi ? 'Thực hành Lệnh macOS MDM & Chẩn đoán' : 'macOS MDM CLI & Diagnostics Labs'}
            </h3>
            <p className="text-[13px] text-secondary leading-relaxed">
              {isVi
                ? 'Thao tác các lệnh profiles, fdesetup, AssetCacheManagerUtil, app-sso, netcat và 6 kịch bản xử lý sự cố doanh nghiệp thực tế.'
                : 'Run live simulated commands: profiles, fdesetup, AssetCacheManagerUtil, app-sso, nc, and 6 real enterprise troubleshooting tickets.'}
            </p>
          </div>
          <Link
            href="/lab/terminal"
            className="pt-2.5 border-t border-border inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
          >
            <span>{isVi ? 'Bắt đầu bài thực hành CLI' : 'Start Terminal Labs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
