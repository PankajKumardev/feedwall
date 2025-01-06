'use server';

import prisma from '@/lib/db';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
});

export const createProject = async (
  name: string,
  description: string,
  url: string
) => {
  const session = useSession();
  if (!session.data?.user) {
    throw new Error('You must be logged in to create a project');
  }
  const userId = session.data.user.email;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: userId as string,
      },
    });
    if (!findUser) {
      throw new Error('User not found');
    }
    const parse = schema.parse({ name, description, url });
    if (!parse) {
      throw new Error('Invalid input');
    }
    const project = await prisma.project.create({
      data: {
        name: parse.name,
        description: parse.description,
        url: parse.url,
        userId: findUser.id,
      },
    });
    if (!project) {
      throw new Error('Project not created');
    }

    return project;
  } catch (error) {
    console.error(error);
  }
};
