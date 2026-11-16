import { NextRequest, NextResponse } from 'next/server';
import { EXAM_BANK } from '@/data/exam-bank';
import { TOPIC_TAGS, TopicTag } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chapterId');
    const topic = searchParams.get('topic');
    const limit = searchParams.get('limit');
    const shuffle = searchParams.get('shuffle') === 'true';

    let questions = [...EXAM_BANK];

    if (chapterId) {
      const ch = parseInt(chapterId, 10);
      if (!isNaN(ch)) {
        questions = questions.filter((q) => q.chapterId === ch);
      }
    }

    if (topic && TOPIC_TAGS.includes(topic as TopicTag)) {
      questions = questions.filter((q) => q.topic === topic);
    }

    if (shuffle) {
      questions.sort(() => 0.5 - Math.random());
    }

    if (limit) {
      const lim = parseInt(limit, 10);
      if (!isNaN(lim) && lim > 0) {
        questions = questions.slice(0, lim);
      }
    }

    return NextResponse.json({
      success: true,
      total: questions.length,
      data: questions,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
