import CreateProjectDialog from '@/components/create-project-dialog';
import ProjectCard from '@/components/Project-Card';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    redirect('/api/auth/signin');
  }
  const projects = await prisma.project.findMany();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          <span className="font-bold text-blue-400">
            Feed
            <span className="text-gray-800 dark:text-[#E7E9EC]">-Wall</span>
          </span>{' '}
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Add your projects now to get valuable feedback.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={{ ...project, id: project.id.toString() }}
          />
        ))}
        <CreateProjectDialog />
      </div>
    </div>
  );
}
