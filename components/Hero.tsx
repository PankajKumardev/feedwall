'use client';

import {
  ArrowRight,
  Layout,
  Rows2,
  Sparkles,
  BarChart,
  Download,
  Eye,
  MonitorSmartphone,
  Bot,
} from 'lucide-react';
import Meteors from './ui/meteors';
import Link from 'next/link';
import { FaGithub, FaStar } from 'react-icons/fa';
import { MarqueeDemo } from './MarqueeDemo';
import Accordian from './Accordion';

function HowItWorksStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#E7E9EC] text-slate-900 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-normal px-12">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="h-full sm:block hidden">
        <Meteors number={5} />
      </div>

      <div className="flex flex-col items-center max-w-4xl mx-auto mt-12 sm:mt-24">
        <div className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#E7E9EC] text-slate-900 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Discover Genuine Feedback</span>
        </div>
      </div>

      <div className="text-3xl sm:text-5xl md:text-6xl text-center text-slate-800 dark:text-[#E7E9EC] font-medium">
        <h1 className="mb-2">Highlight Genuine Feedback</h1>
        <p>Inspire Significant Transformation 🚀</p>
      </div>

      <div className="mt-8 text-center text-base sm:text-lg text-slate-800 dark:text-[#E7E9EC] w-full sm:w-3/4 md:w-1/2 mx-auto px-4">
        <p>
          Easily embed feedback collection on your site, showcase genuine
          insights, and drive impactful growth with minimal effort.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 px-4">
        <button className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 w-full sm:w-auto">
          Get Started Now
          <ArrowRight className="w-4 h-4" />
        </button>
        <Link
          href="https://github.com/pankajKumardev/feedwall"
          target="_blank"
          className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center w-full sm:w-auto shadow-inner shadow-black/10 hover group"
        >
          <FaGithub /> Star on GitHub{' '}
          <span>
            <FaStar className="group-hover:fill-yellow-300" />
          </span>
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-3 px-4 max-w-3xl mx-auto">
        <div className="text-center text-lg text-slate-800 dark:text-[#E7E9EC] flex flex-col items-center">
          <Bot className="w-6 h-6 mb-2" />
          <span>AI Summary</span>
        </div>
        <div className="text-center text-lg text-slate-800 dark:text-[#E7E9EC] flex flex-col items-center">
          <Layout className="w-6 h-6 mb-2" />
          <span>Embed Widget</span>
        </div>
        <div className="text-center text-lg text-slate-800 dark:text-[#E7E9EC] flex flex-col items-center">
          <Rows2 strokeWidth={2} className="w-6 h-6 mb-2" />
          <span>Showcase</span>
        </div>
      </div>

      <div className="mt-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl text-center  text-slate-800 dark:text-[#E7E9EC] font-medium">
          Why Choose Feed-Wall for Collecting Feedback?
        </h2>
        <p className="text-base sm:text-lg text-center mt-4 max-w-xl mx-auto text-slate-800 dark:text-slate-500">
          Feed-wall offers a powerful suite of features to make feedback
          collection and showcasing effortless.
        </p>
        <div className="text-center text-3xl text-slate-800 dark:text-[#E7E9EC] font-medium mt-20">
          Powereful Features!
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8     text-center px-4 sm:px-0 max-w-7xl mx-auto">
          {[
            {
              icon: <Bot className="w-6 h-6" />,
              title: 'AI-Powered Summary',
              description:
                'Get quick insights from feedback highlights, making it easier to understand user sentiments.',
            },
            {
              icon: <MonitorSmartphone className="w-6 h-6" />,
              title: 'Easy Integration',
              description:
                'Embed our feedback widget with minimal code, ensuring a seamless integration process.',
            },
            {
              icon: <Rows2 className="w-6 h-6" />,
              title: 'Showcase Feedbacks',
              description:
                'Display user feedback prominently to build trust and credibility with your audience.',
            },
            {
              icon: <BarChart className="w-6 h-6" />,
              title: 'Categorize Feedback',
              description:
                'Organize feedback by different categories to better analyze and act on user input.',
            },
            {
              icon: <Download className="w-6 h-6" />,
              title: 'Download CSV',
              description:
                'Export all collected feedback as a CSV file for further analysis and record-keeping.',
            },
            {
              icon: <Eye className="w-6 h-6" />,
              title: 'Feedback Visibility',
              description:
                'Manage and control the visibility of user feedback efficiently within your platform.',
            },
          ].map((feature, index) => (
            <div key={index} className="width-fit text-left">
              <div className="flex items-center gap-2">
                {' '}
                <div className="mb-2 w-fit rounded-lg  p-1 text-center dark:text-white text-slate-900  ">
                  {feature.icon}
                </div>
                <div className="text-md mb-1 font-normal text-gray-900 dark:text-gray-100">
                  {feature.title}
                </div>
              </div>
              <div className="font-regular max-w-sm text-xs text-gray-600  dark:text-gray-400">
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-20  ">
        <h2 className="text-3xl text-gray-900 dark:text-gray-100">
          How Feed-Wall Works
        </h2>
        <div className="mt-12 sm:px-20">
          <div className="grid md:grid-cols-3 gap-4">
            <HowItWorksStep
              number={1}
              title="Sign Up"
              description="Create your account in minutes with our simple and secure registration process."
            />
            <HowItWorksStep
              number={2}
              title="Collect Feedback"
              description="Easily embed our widget on your site and start collecting valuable feedback from your users."
            />
            <HowItWorksStep
              number={3}
              title="Analyze & Showcase"
              description="Analyze the feedback and showcase the most impactful insights to drive growth."
            />
          </div>
        </div>
      </div>

      {/* <div className="text-center mt-20">
        <TextRevealByWord
          text="Feed-Wall will revolutionize how you gather and showcase feedback."
        />
      </div> */}

      <div className="mt-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl text-slate-800 dark:text-[#E7E9EC] font-medium">
          See Feed-Wall in Action
        </h2>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-500 mt-4 w-full sm:w-3/4 md:w-1/2 mx-auto px-4">
          Explore a live demo to understand how Feed-Wall can transform your
          feedback collection and presentation.
        </p>

        <div>
          <MarqueeDemo />
        </div>
      </div>
      <div className="mt-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl text-slate-800 dark:text-[#E7E9EC] font-medium">
          FAQ's
        </h2>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-500 mt-4 w-full sm:w-3/4 md:w-1/2 mx-auto px-4">
          Some common FAQ's about Feed-Wall
        </p>
      </div>
      <div>
        <Accordian />
      </div>
      <div className="text-center mt-20 max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl text-slate-800 dark:text-[#E7E9EC] font-medium">
          Ready to Elevate Your Feedback Collection?
        </h2>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-500 mt-4 w-full sm:w-3/4 md:w-1/2 mx-auto px-8">
          Start showcasing your journey to better user feedback insights today
          with Feed-Wall and see the difference it makes.
        </p>
        <div className="flex justify-center mt-8">
          <Link
            className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            href={'/api/auth/signin'}
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
