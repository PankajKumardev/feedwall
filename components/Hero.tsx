import { ArrowRight, Layout, Rows2, Sparkles, Bot } from 'lucide-react';
import Meteors from './ui/meteors';
import Link from 'next/link';
import { FaGithub, FaStar } from 'react-icons/fa';
import { MarqueeDemo } from './MarqueeDemo';
import Accordian from './Accordion';
import { motion } from 'framer-motion';
import Features from './Features';
import HowitWork from './HowItWork';

export default function Home() {
  return (
    <motion.div
      initial={{ filter: 'blur(10px)' }}
      animate={{ filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      <div className="h-full sm:block hidden">
        <Meteors number={5} />
      </div>

      <div className="flex flex-col items-center max-w-4xl mx-auto mt-12 sm:mt-20">
        <div className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#E7E9EC] text-slate-900 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Discover Genuine Feedback</span>
        </div>
      </div>

      <div className="text-4xl sm:text-5xl md:text-6xl text-center text-slate-800 dark:text-[#E7E9EC] font-medium">
        <h1 className="mb-2">Highlight Genuine Feedback</h1>
        <p>Inspire Significant Transformation 🚀</p>
      </div>

      <div className="mt-8 text-center text-base sm:text-lg text-slate-800 dark:text-[#E7E9EC] w-full sm:w-3/4 md:w-1/2 mx-auto px-8 sm:px-4">
        <p>
          Easily embed feedback collection on your site, showcase genuine
          insights, and drive impactful growth with minimal effort.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 px-4">
        <Link
          className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 w-full sm:w-auto"
          href={'signin'}
        >
          Get Started Now
          <ArrowRight className="w-4 h-4" />
        </Link>
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

      <Features />
      <HowitWork />

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
          FAQ&#39;s
        </h2>
        <p className="text-base sm:text-lg text-slate-800 dark:text-slate-500 mt-4 w-full sm:w-3/4 md:w-1/2 mx-auto px-4">
          Some common FAQ&#39;s about Feed-Wall
        </p>
        <div className="text-left">
          <Accordian />
        </div>
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
            href={'/signin'}
          >
            Create Your account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
