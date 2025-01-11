import { Info, Rocket, Package, CheckCircle } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import Accordian from '@/components/Accordion';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Docs() {
  const session = await getServerSession();
  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          <span className="text-blue-500">Feed</span>
          <span className="text-gray-900 dark:text-gray-100">-Wall</span>{' '}
          Documentation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Your ultimate tool to collect, showcase, and gain insights from user
          feedback.
        </p>
      </header>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Info className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            What is Feed-Wall?
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Feed-Wall is a feedback collection tool that simplifies embedding
          feedback forms on your website. It provides AI-powered insights to
          help you understand user sentiments and improve your platform.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Rocket className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Why Choose Feed-Wall?
          </h2>
        </div>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
          <li>
            <strong>AI-Powered Insights:</strong> Quickly understand user
            feedback patterns.
          </li>
          <li>
            <strong>Easy Integration:</strong> Embed feedback forms with minimal
            code.
          </li>
          <li>
            <strong>Feedback Showcasing:</strong> Display top feedback for
            credibility.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Package className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Installation
          </h2>
        </div>
        <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-400">
          <li>Sign up for Feed-Wall.</li>
          <li>Add your project.</li>
          <li>Copy the embed code.</li>
          <li>Insert the code into your website.</li>
          <li>Start collecting feedback.</li>
          <li>Showcase impactful feedback on your site.</li>
        </ol>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Package className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Marquee Installation
          </h2>
        </div>
        <p className="mb-4">
          To display feedback with a marquee effect, run the command below and
          then copy and paste the embed code:
        </p>
        <CodeBlock
          code={`npx shadcn@latest add "https://magicui.design/r/marquee"`}
          filename="marquee"
          language="npm"
        />
        <p className="mt-4">
          If you face any issues, refer to the
          <a
            href="https://magicui.design/docs/components/marquee"
            target="_blank"
            className="text-blue-500 underline ml-1"
          >
            official MagicUI documentation
          </a>
          .
        </p>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <CheckCircle className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>
        <Accordian />
      </section>
    </div>
  );
}
