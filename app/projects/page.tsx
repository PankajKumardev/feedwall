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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="sm:text-4xl text-3xl font-bold text-gray-800 dark:text-gray-200">
          <span className="font-bold text-sky-400">
            Feed
            <span className="text-gray-800 dark:text-[#E7E9EC]">-Wall</span>
          </span>{' '}
          Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4">
          Add your project below to get a script for collecting feedback on your
          site.
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
