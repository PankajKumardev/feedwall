"use server"
import prisma from '@/lib/db';

export default async function getFeedbacks(id: number) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        projectid: id,
      },
    });
    if (!feedbacks) {
      return null;
    }
    return feedbacks;
  } catch (err) {
    console.error(err);
  }
}
