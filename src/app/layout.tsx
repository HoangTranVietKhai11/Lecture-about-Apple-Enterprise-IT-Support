import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { SyncModal } from '@/components/layout/SyncModal';
import { MentorWidget } from '@/components/mentor/MentorWidget';

export const metadata: Metadata = {
  title: 'Apple DEP110 Enterprise Platform — Learning & Exam Simulator',
  description:
    'Comprehensive training and Pearson VUE simulator for Apple Certified IT Professional (DEP110) certification.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-5xl mx-auto w-full flex flex-col gap-6">
            {children}
          </main>
        </div>
        <SyncModal />
        <MentorWidget />
      </body>
    </html>
  );
}
