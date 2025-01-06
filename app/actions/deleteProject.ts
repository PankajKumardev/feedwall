'use server';

import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

export const deleteProject = async (id: number) => {
    try {
        const session = await getServerSession();
        if (!session?.user) {
            throw new Error('You must be logged in to delete a project');
        }
        const userId = session.user.email;
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
