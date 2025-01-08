import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CodeBlock } from '@/components/ui/code-block';
import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';
import Link from 'next/link';

interface Feedback {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  feedback: string;
  rating: number;
  projectid: number;
}

interface MarqueeSelectorProps {
  feedbacks: Feedback[];
}

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative md:w-64 w-32 h-36 md:h-full cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2 w-42 ">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeSelector({ feedbacks }: MarqueeSelectorProps) {
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<Feedback[]>([]);
  const [showCode, setShowCode] = useState(false);

  const handleSelect = (feedback: Feedback) => {
    if (selectedFeedbacks.find((f) => f.id === feedback.id)) {
      setSelectedFeedbacks(
        selectedFeedbacks.filter((f) => f.id !== feedback.id)
      );
    } else if (selectedFeedbacks.length < 6) {
      setSelectedFeedbacks([...selectedFeedbacks, feedback]);
    }
  };

  const generateMarqueeCode = () => {
    const reviews = selectedFeedbacks.map((feedback, index) => ({
      name: feedback.name,
      username: `@${feedback.name.toLowerCase().replace(' ', '')}`,
      body: feedback.feedback,
      img: `https://avatar.vercel.sh/${feedback.name
        .toLowerCase()
        .replace(' ', '')}`,
    }));

    return `import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';

const reviews = ${JSON.stringify(reviews, null, 2)};

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative md:w-64 w-32 h-36 md:h-full cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2 w-42 ">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl p-2 md:p-4">
      <Marquee pauseOnHover className="[--duration:40s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}`;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Create Marquee</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        🎭 Select 1-6 feedbacks to create a custom marquee component.
      </p>
      <div className="space-y-2 mb-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="flex items-center space-x-2">
            <Checkbox
              id={`feedback-${feedback.id}`}
              checked={selectedFeedbacks.some((f) => f.id === feedback.id)}
              onCheckedChange={() => handleSelect(feedback)}
              disabled={
                selectedFeedbacks.length >= 6 &&
                !selectedFeedbacks.some((f) => f.id === feedback.id)
              }
            />
            <label
              htmlFor={`feedback-${feedback.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {feedback.name} - {feedback.feedback.substring(0, 50)}...
            </label>
          </div>
        ))}
      </div>

      {selectedFeedbacks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl p-2 md:p-4">
            <Marquee pauseOnHover className="[--duration:35s]">
              {selectedFeedbacks.map((feedback, index) => (
                <ReviewCard
                  key={feedback.id}
                  img={`https://avatar.vercel.sh/${feedback.name
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                  name={feedback.name}
                  username={`@${feedback.email.toLowerCase().replace(' ', '')}`}
                  body={feedback.feedback}
                />
              ))}
            </Marquee>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Dialog open={showCode} onOpenChange={setShowCode}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setShowCode(true)}
              disabled={selectedFeedbacks.length === 0}
            >
              Generate Marquee Code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Generated Marquee Code</DialogTitle>
            </DialogHeader>
            <CodeBlock
              code={generateMarqueeCode()}
              language="typescript"
              filename="MarqueeDemo.tsx"
            />
          </DialogContent>
        </Dialog>
        <div className="flex items-center space-x-2 mt-4 text-red-600 dark:text-red-400  dark:border-red-400 p-2 rounded">
          <p className="text-sm">
            <Link href="/docs">
              {' '}
              <span role="img" aria-label="notice">
                🚨
              </span>{' '}
              For installation Marquee, see Docs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
