'use client';
import { useEffect, useState } from 'react';
import getProjectName from '@/app/actions/getProject';
import { useParams } from 'next/navigation';
import getFeedbacks from '@/app/actions/getFeedback';

export default function Page() {
  const { id } = useParams();
  const [project, setProject] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<
    | {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
        feedback: string;
        rating: number;
        projectid: number;
      }[]
    | null
  >(null);

  useEffect(() => {
    async function fetchProjectName() {
      if (id) {
        const projectName = await getProjectName(Number(id));
        const Feedbacks = await getFeedbacks(Number(id));
        if (projectName !== undefined) {
          setProject(projectName);
        }
        if (Feedbacks !== undefined) {
          setFeedbacks(Feedbacks);
        }
      }
    }
    fetchProjectName();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project: {project}</h1>
      <h2>Feedbacks for Project ID: {id}</h2>
      {feedbacks ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <p>
                <strong>Name:</strong> {feedback.name}
              </p>
              <p>
                <strong>Email:</strong> {feedback.email}
              </p>
              <p>
                <strong>Feedback:</strong> {feedback.feedback}
              </p>
              <p>
                <strong>Rating:</strong> {feedback.rating}
              </p>
              <p>
                <strong>Created At:</strong>{' '}
                {new Date(feedback.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
}
