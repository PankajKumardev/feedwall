'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { deleteProject } from '../app/actions/deleteProject';
import { useRouter } from 'next/navigation';

type Project = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  async function deleteProjectHandler(id: string) {
    try {
      await deleteProject(Number(id));
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteProjectHandler(project.id);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => window.open(project.url, '_blank')}
        >
          View
        </Button>
        <form onSubmit={handleDelete}>
          <input type="hidden" name="id" value={project.id} />
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
