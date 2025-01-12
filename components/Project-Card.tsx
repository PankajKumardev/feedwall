'use client';

import { useState } from 'react';
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
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

type Project = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function deleteProjectHandler(id: string) {
    try {
      setLoading(true);
      await deleteProject(Number(id));
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteProjectHandler(project.id);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="mb-2">{project.name}</CardTitle>
        <hr className="border-gray-300 dark:border-gray-700" />
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <Link
            href={project.url}
            className="text-blue-500 dark:text-blue-500"
            target="_blank"
          >
            {project.url.length > 30
              ? `${project.url.substring(0, 30)}...`
              : project.url}
          </Link>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(`/feedbacks/${project.id}/`)}
        >
          View
        </Button>
        <form onSubmit={handleDelete}>
          <input type="hidden" name="id" value={project.id} />
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Delete'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
