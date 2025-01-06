'use server';

import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
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
    const session = await getServerSession();
    console.log('Session:', session); // Add this line to log the session object
    if (!session?.user) {
        throw new Error('You must be logged in to create a project');
    }
    const userId = session.user.email;

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
            throw new Error('Invalid input');
        }
        const project = await prisma.project.create({
            data: {
                name: parse.data.name,
                description: parse.data.description,
                url: parse.data.url,
                userId: findUser.id,
            },
        });
        if (!project) {
            throw new Error('Project not created');
        }

        return project;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the project');
    }
};
