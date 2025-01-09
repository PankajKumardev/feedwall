import { ArrowRight, Sparkles } from 'lucide-react';
import Meteors from './ui/meteors';

export default function Hero() {
  return (
    <div>
      <div className="h-full sm:block hidden">
        <Meteors number={10} />
      </div>
      <div className="flex flex-col items-center max-w-4xl mx-auto mt-16">
        <div className="flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-[#E7E9EC] text-slate-900 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Discover Genuine Feedback</span>
        </div>
      </div>
      <div className=" text-6xl text-center text-slate-800 dark:text-[#E7E9EC]  font-medium">
        <h1>Highlight Genuine Feedback</h1>
        <p>Inspire Significant Transformation 🚀</p>
      </div>
      <div className="mt-8 text-center text-lg text-slate-800 dark:text-[#E7E9EC] w-1/2 mx-auto">
        <p>
          Easily embed feedback collection on your site, showcase genuine
          insights, and drive impactful growth with minimal effort.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Get Started Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex justify-center mt-8"></div>
    </div>
  );
}
