import { PrismaClient, TopicTag } from '@prisma/client';
import { EXAM_BANK } from '../src/data/exam-bank';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Bắt đầu Seeding Dữ Liệu Apple DEP110 ---');

  for (const q of EXAM_BANK) {
    const qId = String(q.id);
    const question = await prisma.question.upsert({
      where: { id: qId },
      update: {
        chapterId: q.chapterId,
        topic: q.topic as TopicTag,
        questionEn: q.qEn,
        questionVn: q.qVn,
        correctIds: [String(q.ans)],
        isMultiple: false,
        explanationVn: q.expVn,
        explanationEn: q.expEn || q.expVn,
      },
      create: {
        id: qId,
        chapterId: q.chapterId,
        topic: q.topic as TopicTag,
        questionEn: q.qEn,
        questionVn: q.qVn,
        correctIds: [String(q.ans)],
        isMultiple: false,
        explanationVn: q.expVn,
        explanationEn: q.expEn || q.expVn,
        options: {
          create: q.opts.map((opt: string, idx: number) => ({
            id: `${qId}-${idx}`,
            label: String.fromCharCode(65 + idx),
            textEn: q.optsEn?.[idx] || opt,
            textVn: opt,
          })),
        },
      },
    });
    console.log(`Đã seed câu hỏi: ${question.id}`);
  }

  console.log(`\n Hoàn tất seed ${EXAM_BANK.length} câu hỏi DEP110 vào cơ sở dữ liệu.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
