import { NextRequest, NextResponse } from 'next/server';
import { EXAM_BANK } from '@/data/exam-bank';

interface SubmissionPayload {
  mode: 'TIMED' | 'PRACTICE';
  timeSpentSeconds: number;
  answers: Record<string, number>;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmissionPayload = await request.json();
    const { mode, timeSpentSeconds, answers } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid answers payload' },
        { status: 400 }
      );
    }

    const questionIds = Object.keys(answers);
    const questions = EXAM_BANK.filter((q) => questionIds.includes(String(q.id)));

    let correctCount = 0;
    const topicStats: Record<string, { total: number; correct: number }> = {};
    const results = questions.map((q) => {
      const userSelected = answers[String(q.id)];
      const isCorrect = userSelected === q.ans;

      if (isCorrect) correctCount++;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total++;
      if (isCorrect) topicStats[q.topic].correct++;

      return {
        questionId: q.id,
        userSelected,
        correctAnswer: q.ans,
        isCorrect,
        topic: q.topic,
      };
    });

    const totalQuestions = questions.length || 1;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = score >= 75;

    return NextResponse.json({
      success: true,
      data: {
        mode,
        timeSpentSeconds,
        totalQuestions,
        correctCount,
        score,
        isPassed,
        passingScore: 75,
        topicStats,
        results,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
