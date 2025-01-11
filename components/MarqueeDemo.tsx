import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';

const reviews = [
  {
    name: 'Sanya Rao',
    username: '@sanyarao',
    body: 'Really useful platform. Easy to integrate, and the feedback categorization makes everything so much clearer.',
    img: 'https://avatar.vercel.sh/sanyarao',
  },
  {
    name: 'Vikram Joshi',
    username: '@vikramjoshi',
    body: 'The feedback widget is simple to use. It would be great if the CSV export had more customization options.',
    img: 'https://avatar.vercel.sh/vikramjoshi',
  },
  {
    name: 'Ananya',
    username: '@ananya',
    body: 'I love how easy it is to showcase feedback on the website. It builds trust with my audience effortlessly!',
    img: 'https://avatar.vercel.sh/ananya',
  },
  {
    name: 'Amit Patel',
    username: '@amitpatel',
    body: 'The export feature works well, but I faced some issues with the visibility settings.',
    img: 'https://avatar.vercel.sh/amitpatel',
  },
  {
    name: 'Kunal Gupta',
    username: '@kunalgupta',
    body: 'Nice platform overall. I like the AI insights, but the integration could be more intuitive for beginners.',
    img: 'https://avatar.vercel.sh/kunalgupta',
  },
  {
    name: 'Arjun Verma',
    username: '@arjunverma',
    body: 'The tool is great for feedback collection. I love the AI summary feature, but the UI could be smoother.',
    img: 'https://avatar.vercel.sh/arjunverma',
  },
];

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
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-background  p-2 md:p-4">
      <Marquee pauseOnHover className="[--duration:40s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}
