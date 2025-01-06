'use server';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function getProjectName(id: number) {
  const isValidID = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  if (!isValidID) {
    return redirect('/error');
  }
  const projectName = await prisma.project.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
    },
  });
  return projectName?.name;
}
