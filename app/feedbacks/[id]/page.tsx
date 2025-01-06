'use client';
import { SetStateAction, useEffect, useState } from 'react';
import getProjectName from '@/app/actions/getProject';
import { useParams } from 'next/navigation';
import getFeedbacks from '@/app/actions/getFeedback';
import { AISummary } from '@/app/actions/Ai';

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

  const [summary, setSummary] = useState<string>(' ');

  async function getSummary(
    feedbacks:
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
  ) {
    if (feedbacks) {
      const summary = await AISummary(feedbacks);
      if (summary) {
        setSummary(summary);
      }
    }
  }

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
      <div>
        <button onClick={() => getSummary(feedbacks)}>get summary</button>
      </div>
      <p>{summary}</p>
    </div>
  );
}
