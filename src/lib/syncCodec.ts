import { SyncPayload, ExamAttemptRecord } from '@/types';

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(base64Url: string): Uint8Array {
  const padded = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  const binary = atob(padded + '='.repeat(padLen));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function isValidExamAttempt(item: unknown): item is ExamAttemptRecord {
  if (!item || typeof item !== 'object') return false;
  const rec = item as Record<string, unknown>;
  return (
    typeof rec.id === 'string' &&
    typeof rec.date === 'string' &&
    typeof rec.mode === 'string' &&
    typeof rec.score === 'number' &&
    typeof rec.totalQuestions === 'number' &&
    typeof rec.percentage === 'number' &&
    typeof rec.passed === 'boolean'
  );
}

export function sanitizeSyncPayload(raw: unknown): SyncPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;

  const completedChapters = Array.isArray(obj.completedChapters)
    ? obj.completedChapters.filter((n): n is number => typeof n === 'number' && n >= 1 && n <= 14)
    : [];

  const completedMissions = Array.isArray(obj.completedMissions)
    ? obj.completedMissions.filter((s): s is string => typeof s === 'string')
    : [];

  const masteredTerms = Array.isArray(obj.masteredTerms)
    ? obj.masteredTerms.filter((s): s is string => typeof s === 'string')
    : [];

  const solvedLabs = Array.isArray(obj.solvedLabs)
    ? obj.solvedLabs.filter((s): s is string => typeof s === 'string')
    : [];

  const chapterNotes: Record<number, string> = {};
  if (obj.chapterNotes && typeof obj.chapterNotes === 'object') {
    for (const [k, v] of Object.entries(obj.chapterNotes as Record<string, unknown>)) {
      const numKey = Number(k);
      if (!Number.isNaN(numKey) && typeof v === 'string' && v.trim().length > 0) {
        chapterNotes[numKey] = v;
      }
    }
  }

  const bestExamPct =
    typeof obj.bestExamPct === 'number' && obj.bestExamPct >= 0 && obj.bestExamPct <= 100
      ? obj.bestExamPct
      : null;

  const examHistory = Array.isArray(obj.examHistory)
    ? obj.examHistory.filter(isValidExamAttempt).slice(0, 50)
    : [];

  // Reject completely unrelated JSON objects that contain none of our expected keys
  const hasKnownKey =
    'completedChapters' in obj ||
    'masteredTerms' in obj ||
    'examHistory' in obj ||
    'chapterNotes' in obj ||
    'solvedLabs' in obj;

  if (!hasKnownKey) return null;

  return {
    version: typeof obj.version === 'number' ? obj.version : 1,
    exportedAt: typeof obj.exportedAt === 'string' ? obj.exportedAt : new Date().toISOString(),
    completedChapters,
    completedMissions,
    masteredTerms,
    chapterNotes,
    solvedLabs,
    bestExamPct,
    examHistory,
  };
}

export async function encodeSyncPayload(payload: SyncPayload): Promise<string> {
  const json = JSON.stringify(payload);
  const rawBytes = new TextEncoder().encode(json);

  if (typeof CompressionStream !== 'undefined') {
    try {
      const cs = new CompressionStream('deflate-raw');
      const writer = cs.writable.getWriter();
      const inputBuf = new ArrayBuffer(rawBytes.byteLength);
      new Uint8Array(inputBuf).set(rawBytes);
      writer.write(inputBuf);
      writer.close();
      const compressedBuffer = await new Response(cs.readable).arrayBuffer();
      return `dep1_${bytesToBase64Url(new Uint8Array(compressedBuffer))}`;
    } catch {
      // Fallback to uncompressed token when CompressionStream fails
    }
  }

  return `dep0_${bytesToBase64Url(rawBytes)}`;
}

export async function decodeSyncPayload(input: string): Promise<SyncPayload | null> {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let token = trimmed;

  // Extract ?sync=... if user pasted a full URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsedUrl = new URL(trimmed);
      const param = parsedUrl.searchParams.get('sync');
      if (param) {
        token = param.trim();
      }
    } catch {
      return null;
    }
  }

  try {
    if (token.startsWith('dep1_')) {
      if (typeof DecompressionStream === 'undefined') return null;
      const compressed = base64UrlToBytes(token.slice(5));
      const inputBuf = new ArrayBuffer(compressed.byteLength);
      new Uint8Array(inputBuf).set(compressed);
      const ds = new DecompressionStream('deflate-raw');
      const writer = ds.writable.getWriter();
      writer.write(inputBuf);
      writer.close();
      const decompressedBuffer = await new Response(ds.readable).arrayBuffer();
      const json = new TextDecoder().decode(decompressedBuffer);
      return sanitizeSyncPayload(JSON.parse(json));
    }

    if (token.startsWith('dep0_')) {
      const bytes = base64UrlToBytes(token.slice(5));
      const json = new TextDecoder().decode(bytes);
      return sanitizeSyncPayload(JSON.parse(json));
    }

    // Also accept raw JSON backup text
    if (token.startsWith('{')) {
      return sanitizeSyncPayload(JSON.parse(token));
    }
  } catch {
    return null;
  }

  return null;
}
