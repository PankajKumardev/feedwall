'use client';
import { useEffect, useState } from 'react';
import getProjectName from '@/app/actions/getProject';
import { useParams } from 'next/navigation';
import getFeedbacks from '@/app/actions/getFeedback';
import { AISummary } from '@/app/actions/Ai';
import { EmbededCode } from '@/components/embedCode';
import { CodeBlock } from '@/components/ui/code-block';

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
      if (feedbacks.length === 0) {
        setSummary('No feedbacks available');
        return;
      }
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="sm:text-4xl text-3xl font-bold text-gray-800 dark:text-gray-200">
          <span className="font-bold text-sky-400">
            Feed
            <span className="text-gray-800 dark:text-[#E7E9EC]">-Wall</span>
          </span>{' '}
          Feedbacks
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4">
          This section contains feedbacks and the project script embedded for
          review.
        </p>
      </header>

      <div>
        <h2>Customer Feedbacks</h2>
        <div className="flex flex-col">
          {feedbacks?.map((feedback, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col my-4"
            >
              <div>
                <div>
                  {feedback.name} - {feedback.email} -{' '}
                  {feedback.createdAt.toLocaleDateString()} - {feedback.rating}{' '}
                  - {feedback.feedback}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Embed Code</h2>
        <p>📋 Embed this code to add a feedback widget to your site!</p>
        <div>
          <EmbededCode
            tab1Content={
              <div>
                <CodeBlock
                  code={` <body>
    <div style="position: fixed; bottom: 15px; right: 15px">
      <widget-web-component theme="solarFlare" website-name=${project} projectid=${id}></widget-web-component>
    </div>
  
    <script src="https://widget.opinify.in/widget.umd.js"></script>
  </body>            `}
                  language="html"
                  filename="index.html"
                />
              </div>
            }
            tab2Content={
              <div>
                <CodeBlock
                  code={` declare global {
    namespace JSX {
      interface IntrinsicElements {
        "widget-web-component": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          projectid: number;
          theme: string;
        };
      }
    }
  }
  
  <body>
    <div style={{position: "fixed", bottom: "15px", right: "15px"}}>
      <widget-web-component theme="solarFlare" website-name=${project} projectid=${id} />
    </div>

    <script async src="https://widget.opinify.in/widget.umd.js"></script>
  </body>`}
                  language="typescript"
                  filename="index.tsx"
                />
              </div>
            }
          />
        </div>
      </div>
      <div>
        <h2>Feedback Summary</h2>
        <p>get summary through AI</p>
        <button onClick={() => getSummary(feedbacks)}>Get summary</button>
        <div>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
}
