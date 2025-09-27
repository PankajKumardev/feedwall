'use server';

import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import rateLimiter, { RATE_LIMITS } from '@/lib/rate-limit';

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
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error('You must be logged in to create a project');
  }

  const userId = session.user.email;

  // Rate limiting check
  const rateLimitResult = rateLimiter.checkLimit(
    `project:${userId}`,
    RATE_LIMITS.PROJECT_CREATION.limit,
    RATE_LIMITS.PROJECT_CREATION.windowMs
  );

  if (!rateLimitResult.isAllowed) {
    throw new Error(
      `Rate limit exceeded. You can create ${RATE_LIMITS.PROJECT_CREATION.limit} projects per hour. Please try again later.`
    );
  }

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: userId as string,
      },
    });

    if (!findUser) {
      throw new Error('User not found');
    }

    const parse = schema.safeParse({ name, description, url });
    if (!parse.success) {
      throw new Error('Invalid input data');
    }

    const project = await prisma.project.create({
      data: {
        name: parse.data.name,
        description: parse.data.description,
        url: parse.data.url,
        userId: findUser.id,
      },
    });

    return project;
  } catch (error) {
    console.error('Project creation error:', error);
    throw new Error('Failed to create project');
  }
};
