# Apple DEP110 Platform - System Architecture & Coding Prompt

## 1. Overview & Objective
This document defines the system architecture, technology stack, and prompt guidelines for developing the **Apple Enterprise Deployment & DEP110 Exam Simulator Web Platform**. The platform is designed for students and IT professionals preparing for the **Apple Certified IT Professional (DEP110)** certification.

---

## 2. Technology Stack & Frameworks

### Frontend
- **Framework**: React 18+ (Next.js 14 App Router or Vite + React)
- **Language**: TypeScript (Strict Mode enabled)
- **Styling**: Tailwind CSS + Shadcn/UI Component Library
- **Icons**: Lucide React Icons
- **State Management**: Zustand (App state, Exam timers, Active session state, Flagged questions)
- **Diagram Engine**: React Flow (`@xyflow/react`) for step-by-step interactive architecture visualizers

### Backend & Database
- **API Engine**: Next.js Route Handlers / Node.js (Express/FastAPI equivalent in TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Authentication**: NextAuth.js / Supabase Auth (Role-Based Access Control: `STUDENT`, `ADMIN`)

### Localization
- **Bilingual Engine**: Vietnamese & English (Real-time language toggle for exam questions, study notes, and explanations)

---

## 3. Core Functional Modules

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       APPLE DEP110 PLATFORM MODULES                         │
├──────────────┬──────────────────┬─────────────────┬──────────────┬──────────┤
│ Module 1     │ Module 2         │ Module 3        │ Module 4     │ Module 5 │
│ Learning Hub │ Chapter Checkpoints│ Exam Simulator  │ Visualizer   │ Terminal │
└──────────────┴──────────────────┴─────────────────┴──────────────┴──────────┘
```

1. **Learning Hub (`/learn`)**:
   - Structured theoretical notes for all 14 chapters of Apple DEP110.
   - Comparison matrices (User Enrollment vs. ADE, Jamf Policy vs. Configuration Profile).
   - Apple CLI command cheat sheets.

2. **Chapter Checkpoints (`/learn/[chapterId]/quiz`)**:
   - 5-10 targeted quiz questions after completing each chapter.
   - Immediate feedback and detailed bilingual explanations.

3. **Exam Simulator (`/exam`)**:
   - **Timed Exam Mode**: 60 questions / 60 minutes, 75% passing grade (Pearson VUE standard). Features countdown timer, question navigator grid, flag questions, and result summary.
   - **Practice Mode**: Untimed, immediate answer check with bilingual explanations.
   - Post-exam diagnostic breakdown by weak topics.

4. **Architecture Visualizer (`/visualizer`)**:
   - Step-by-step interactive flow diagrams powered by React Flow:
     - APNs Push Notification flow (Port 5223 / 443 outbound to `17.0.0.0/8`).
     - Automated Device Enrollment (ADE) & Zero-touch activation.
     - Declarative Device Management (DDM) autonomous state changes.
     - Platform SSO Shared Device Keys for IdP machine-level trust.

5. **macOS Terminal Emulator (`/lab/terminal`)**:
   - Simulated Web Terminal running native macOS commands (`profiles status -type enrollment`, `sudo jamf policy`, `cat /var/log/jamf.log`).

---

## 4. Database Schema (Prisma ORM)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String        @id @default(uuid())
  email        String        @unique
  name         String?
  role         Role          @default(STUDENT)
  examSessions ExamSession[]
  createdAt    DateTime      @default(now())
}

enum Role {
  STUDENT
  ADMIN
}

model Question {
  id            String       @id @default(uuid())
  chapterId     Int          // Chapters 1 to 14
  topic         TopicTag
  questionEn    String
  questionVn    String
  options       Option[]
  correctIds    String[]     // Array of correct Option IDs
  isMultiple    Boolean      @default(false)
  explanationVn String
  explanationEn String
  userAnswers   UserAnswer[]
}

enum TopicTag {
  APNS_ARCHITECTURE
  SUPERVISION_ADE
  CONFIGURATION_PROFILES
  JAMF_POLICIES
  DECLARATIVE_MANAGEMENT_DDM
  PLATFORM_SSO
  VOLUME_PURCHASING_VPP
  CONTENT_CACHING
  FILEVAULT_SECURITY
  FIRMWARE_DFU_RECOVERY
}

model Option {
  id         String   @id @default(uuid())
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  label      String   // A, B, C, D
  textEn     String
  textVn     String
}

model ExamSession {
  id        String       @id @default(uuid())
  userId    String
  user      User         @relation(fields: [userId], references: [id])
  mode      ExamMode     // TIMED or PRACTICE
  score     Float?
  isPassed  Boolean?
  startedAt DateTime     @default(now())
  endedAt   DateTime?
  answers   UserAnswer[]
}

enum ExamMode {
  TIMED
  PRACTICE
}

model UserAnswer {
  id          String      @id @default(uuid())
  sessionId   String
  session     ExamSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  questionId  String
  question    Question    @relation(fields: [questionId], references: [id])
  selectedIds String[]
  isCorrect   Boolean
}
```

---

## 5. Apple DEP110 Technical Requirements & Rules

1. **Configuration Profiles (.mobileconfig)**:
   - Part of Apple's native MDM framework. Supported on iOS, iPadOS, and macOS.
   - Configures system settings: Wi-Fi (802.1X/EAP-TLS), Passcode, Restrictions, FileVault, VPN.
   - **Constraint**: Cannot execute arbitrary shell scripts or install custom `.pkg`/`.dmg` packages.

2. **Jamf Policies (Jamf Pro Agent)**:
   - Relies on `jamf binary` running with `root` privileges. **macOS ONLY**.
   - **Required for**: Executing custom Bash/Zsh scripts, installing `.pkg`/`.dmg` installers outside App Store/VPP, and running system maintenance (`jamf recon`).

3. **Apple Push Notification service (APNs)**:
   - Requires outbound TCP Port 5223 (or 443 fallback) to Apple's `17.0.0.0/8` IP range.
   - Expiration of the APNs Certificate halts all remote management commands.

4. **Platform SSO & Shared Device Keys**:
   - Shared Device Keys are required in ADE flows to establish hardware-bound trust with Identity Providers (Entra ID/Okta) independent of individual user accounts, enabling on-demand user account creation.

---

## 6. Prompt for AI Coding Assistant (Cursor / v0 / Claude)

Use the prompt below when handing off code implementation to an AI coding assistant:

```markdown
You are an expert Full-Stack Software Engineer building a React/TypeScript web application for the Apple DEP110 Learning & Exam Simulator platform.

System Architecture Guidelines:
1. Tech Stack: React 18+ (Next.js 14 App Router), TypeScript, Tailwind CSS, Shadcn/UI, Zustand, React Flow.
2. Follow the Prisma Schema defined above for data models.
3. Build modular UI components under `@/components/`:
   - `@/components/learn/`: Chapter list and study view.
   - `@/components/exam/`: Timed & practice exam engines.
   - `@/components/visualizer/`: APNs and ADE flow diagrams.
   - `@/components/terminal/`: Web terminal emulator.
4. Always ensure strict TypeScript types and clean, maintainable code.
```
