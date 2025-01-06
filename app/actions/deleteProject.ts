'use server';

import prisma from '@/lib/db';
import { useSession } from 'next-auth/react';

export const deleteProject = async (id: number) => {
  try {
    const session = useSession();
    if (!session.data?.user) {
      throw new Error('You must be logged in to delete a project');
    }
    const userId = session.data.user.email;
    if (!userId) {
      throw new Error('User not found');
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email: userId as string,
      },
    });
    if (!findUser) {
      throw new Error('User not found');
    }

    const project = await prisma.project.delete({
      where: {
        id: id,
        userId: findUser.id,
      },
    });
    if (!project) {
      throw new Error('Project not found');
    }
  } catch (error) {
    console.error(error);
  }
};
