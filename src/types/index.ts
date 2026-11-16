export type Language = 'vi' | 'en';
export type Theme = 'light' | 'dark';

export const TOPIC_TAGS = [
  'APNS_ARCHITECTURE',
  'SUPERVISION_ADE',
  'CONFIGURATION_PROFILES',
  'JAMF_POLICIES',
  'DECLARATIVE_MANAGEMENT_DDM',
  'PLATFORM_SSO',
  'VOLUME_PURCHASING_VPP',
  'CONTENT_CACHING',
  'FILEVAULT_SECURITY',
  'FIRMWARE_DFU_RECOVERY',
] as const;

export type TopicTag = (typeof TOPIC_TAGS)[number];

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ChapterCard {
  badge?: string;
  heading?: string;
  title?: string;
  body: string;
  bullets: string[];
}

export interface CheckpointQuestion {
  id?: string;
  q: string;
  qEn?: string;
  opts: string[];
  optsEn?: string[];
  ans: number;
  exp: string;
  expEn?: string;
}

export interface TerminologyItem {
  en: string;
  vi: string;
  def: string;
  defEn?: string;
}

export interface Chapter {
  id: number;
  code: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  lede?: string;
  ledeEn?: string;
  duration?: string;
  keyTerms?: string[];
  terms?: TerminologyItem[];
  cards: ChapterCard[];
  comparisonTable?: ComparisonTable;
  quizzes?: CheckpointQuestion[];
  checkpoints?: CheckpointQuestion[];
  tip?: string;
}

export interface ExamQuestionOption {
  id: string;
  label: string; // A, B, C, D
  textVn: string;
  textEn: string;
}

export interface ExamQuestion {
  id: number | string;
  chapterId: number;
  topic: TopicTag;
  domain: string;
  qVn: string;
  qEn: string;
  opts: string[];
  optsEn?: string[];
  ans: number;
  expVn: string;
  expEn?: string;
}

export type ExamMode = 'TIMED' | 'PRACTICE' | 'CHAPTER' | 'RETRY';

export interface ExamAttemptRecord {
  id: string;
  date: string; // ISO date string
  mode: ExamMode;
  title: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
}

export interface ExamSessionState {
  started: boolean;
  finished: boolean;
  mode: ExamMode;
  questions: ExamQuestion[];
  currentIdx: number;
  answers: Record<number, number>; // question index -> selected option index
  flagged: number[]; // question index list
  secondsLeft: number;
  score?: number;
  percentage?: number;
  passed?: boolean;
  title?: string;
  startedAt?: string;
}

export interface FlowchartNode {
  tag: string;
  title: string;
  port: string;
  normal: string;
  fault?: string;
}

export interface FlowchartDefinition {
  id?: string;
  title: string;
  desc: string;
  hasFaultToggle?: boolean;
  faultLabel?: string;
  nodes: FlowchartNode[];
}

export interface TerminalMission {
  id: string;
  title: string;
  hint: string;
  desc: string;
}

export interface TroubleshootingLab {
  id: string;
  code: string;
  title: string;
  severity: string;
  symptom: string;
  logs: string;
  causes: string[];
  correctCause: number;
  fixes: string[];
  correctFix: number;
  explain: string;
}

export interface MentorContext {
  question?: string;
  userSelected?: string;
  correctAnswer?: string;
  context?: string;
}

export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

