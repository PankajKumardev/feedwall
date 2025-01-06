'use server';

import prisma from '@/lib/db';

export const deleteFeedback = async (id: number) => {
  try {
    await prisma.feedback.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
